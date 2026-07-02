const translations = {
    en: {
        nav_home:"Home",nav_collection:"Collection",nav_about:"About",nav_contact:"Contact",
        categories_title:"Categories",hero_title:"NEW ARRIVAL",hero_subtitle:"Discover our latest collection.",
        shop_now:"Shop Now",about_title:"Our Story",stat_customers:"Happy Customers",
        stat_designs:"Modern Designs",stat_sustainable:"Sustainable",collection_title:"Our Collection",
        footer_about:"Elevating your daily style with premium quality apparel.",
        footer_follow:"Follow Us",footer_rights:"All rights reserved.",quick_links:"Quick Links",
        product_details_title:"Product Details",add_to_cart:"Add to Cart",
        search_placeholder:"Search for products...",suggested_categories:"Suggested Categories",
        cat_tops:"Tops",cat_outerwear:"Outerwear",cat_dresses:"Dresses",cat_footwear:"Footwear",
        cat_accessories:"Accessories",cart_title:"Your Cart",cart_empty:"Your cart is empty",
        total_label:"Total:",checkout_btn:"Checkout",checkout_title:"Checkout",
        label_name:"Full Name",placeholder_name:"John Doe",label_email:"Email Address",
        placeholder_email:"john@example.com",label_address:"Shipping Address",
        placeholder_address:"Street, City, Country",label_country:"Country",
        payment_method_title:"Payment Method",method_cod:"Cash on Delivery",
        method_card:"Credit / Debit Card",label_card_number:"Card Number",
        label_expiry:"Expiry Date",label_cvv:"CVV",label_card_name:"Cardholder Name",
        place_order_btn:"Place Order",order_summary_title:"Order Summary",
        mobile_feedback:"Share Opinion",feedback_title:"Share Your Opinion",
        feedback_subtitle:"We value your feedback",feedback_name_label:"Your Name",
        feedback_message_label:"Your Message",feedback_message_placeholder:"Tell us what you think...",
        feedback_btn:"Send Feedback",register_title:"Register",register_subtitle:"Create your account",
        newsletter_title:"Newsletter",newsletter_desc:"Subscribe for exclusive deals",
        subscribe_btn:"Subscribe",related_title:"You May Also Like",
        wishlist_added:"Added to wishlist",wishlist_removed:"Removed from wishlist",
        wishlist_btn:"Wishlist",recently_viewed_title:"Recently Viewed",
        reviews_title:"Customer Reviews",write_review:"Write a Review",submit_review:"Submit Review",
        size_chart_btn:"Size Chart",size_chart_title:"Size Guide",size_chart_note:"Measurements in inches.",
        shipping_title:"Shipping Method",shipping_standard:"Standard",shipping_express:"Express",
        shipping_nextday:"Next Day",shipping_label:"Shipping:",tax_label:"Tax:",
        subtotal_label:"Subtotal:",tracking_title:"Order Tracking",
        coupon_placeholder:"Coupon code",apply_coupon:"Apply",
    },
    fr: {
        nav_home:"Accueil",nav_collection:"Collection",nav_about:"À Propos",nav_contact:"Contact",
        categories_title:"Catégories",hero_title:"NOUVELLE ARRIVÉE",hero_subtitle:"Découvrez notre collection.",
        shop_now:"Acheter Maintenant",about_title:"Notre Histoire",
        stat_customers:"Clients Heureux",stat_designs:"Designs Modernes",stat_sustainable:"Durable",
        collection_title:"Notre Collection",footer_about:"Élevez votre style quotidien.",
        footer_follow:"Suivez-nous",footer_rights:"Tous droits réservés.",quick_links:"Liens Rapides",
        product_details_title:"Détails du Produit",add_to_cart:"Ajouter au Panier",
        search_placeholder:"Rechercher des produits...",suggested_categories:"Catégories Suggérées",
        cat_tops:"Hauts",cat_outerwear:"Vêtements d'extérieur",cat_dresses:"Robes",
        cat_footwear:"Chaussures",cat_accessories:"Accessoires",cart_title:"Votre Panier",
        cart_empty:"Votre panier est vide",total_label:"Total:",checkout_btn:"Commander",
        checkout_title:"Paiement",label_name:"Nom Complet",placeholder_name:"Jean Dupont",
        label_email:"Adresse Email",placeholder_email:"jean@example.com",
        label_address:"Adresse de Livraison",placeholder_address:"Rue, Ville, Pays",
        label_country:"Pays",payment_method_title:"Mode de Paiement",
        method_cod:"Paiement à la Livraison",method_card:"Carte de Crédit/Débit",
        label_card_number:"Numéro de Carte",label_expiry:"Date d'expiration",label_cvv:"CVV",
        label_card_name:"Nom du Titulaire",place_order_btn:"Passer la Commande",
        order_summary_title:"Résumé de la Commande",mobile_feedback:"Donner votre avis",
        feedback_title:"Donnez votre avis",feedback_subtitle:"Nous apprécions vos commentaires",
        feedback_name_label:"Votre Nom",feedback_message_label:"Votre Message",
        feedback_message_placeholder:"Dites-nous ce que vous pensez...",
        feedback_btn:"Envoyer",register_title:"S'inscrire",register_subtitle:"Créez votre compte",
        newsletter_title:"Newsletter",newsletter_desc:"Abonnez-vous pour des offres exclusives",
        subscribe_btn:"S'abonner",related_title:"Vous Aimerez Aussi",
        wishlist_added:"Ajouté aux favoris",wishlist_removed:"Retiré des favoris",
        wishlist_btn:"Favoris",recently_viewed_title:"Récemment Consultés",
        reviews_title:"Avis Clients",write_review:"Écrire un Avis",submit_review:"Soumettre",
        size_chart_btn:"Guide des Tailles",size_chart_title:"Guide des Tailles",
        size_chart_note:"Mesures en pouces.",shipping_title:"Mode de Livraison",
        shipping_standard:"Standard",shipping_express:"Express",shipping_nextday:"Jour Suivant",
        shipping_label:"Livraison:",tax_label:"Taxe:",subtotal_label:"Sous-total:",
        tracking_title:"Suivi de Commande",coupon_placeholder:"Code promo",
        apply_coupon:"Appliquer",
    }
};

const API_BASE = 'http://localhost:5000/api';

let currentLang = localStorage.getItem('clothify_lang') || 'en';
const sessionId = localStorage.getItem('clothify_session_id') || 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
localStorage.setItem('clothify_session_id', sessionId);

const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount) + ' \u20AC';
};
let currentSort = 'default';
let currentFilter = null;
let cart = JSON.parse(localStorage.getItem('clothify_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('clothify_wishlist')) || [];
let allProducts = [];
let searchHistory = JSON.parse(localStorage.getItem('clothify_search_history')) || [];
let recentlyViewed = JSON.parse(localStorage.getItem('clothify_recently_viewed')) || [];
let compareList = JSON.parse(localStorage.getItem('clothify_compare')) || [];
let appliedCoupon = null;
let currentUser = JSON.parse(localStorage.getItem('clothify_user')) || null;

productsData = [
    {id:1,name:"Premium Tee",price:29.00,image:"https://images.pexels.com/photos/4066290/pexels-photo-4066290.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/4066290/pexels-photo-4066290.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Elevate your daily style with this premium quality tee.",category:"Tops",stock:15,rating:4.5,reviews:[]},
    {id:2,name:"Denim Jacket",price:89.00,image:"https://images.pexels.com/photos/13662420/pexels-photo-13662420.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/13662420/pexels-photo-13662420.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2887765/pexels-photo-2887765.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/36029/aroni-arsa-1910s-bow.jpg?auto=compress&cs=tinysrgb&w=1260"],description:"Classic denim jacket with a modern fit.",category:"Outerwear",stock:8,rating:4.2,reviews:[]},
    {id:3,name:"Summer Dress",price:49.00,image:"https://images.pexels.com/photos/19895977/pexels-photo-19895977.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/19895977/pexels-photo-19895977.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/981214/pexels-photo-981214.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1863668/pexels-photo-1863668.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Experience ultimate comfort with this summer dress.",category:"Dresses",stock:22,rating:4.7,reviews:[]},
    {id:4,name:"Canvas Sneakers",price:59.00,image:"https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1670767/pexels-photo-1670767.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Modern sneakers designed for comfort.",category:"Footwear",stock:30,rating:4.3,reviews:[]},
    {id:5,name:"Linen Shirt",price:39.00,image:"https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2894933/pexels-photo-2894933.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Light and breathable linen shirt.",category:"Tops",stock:0,rating:3.8,reviews:[]},
    {id:6,name:"Chino Pants",price:45.00,image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=1260",images:["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=1260","https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Comfortable chino pants with modern fit.",category:"Pants",stock:18,rating:4.0,reviews:[]},
    {id:7,name:"Beanie Hat",price:19.00,image:"https://images.pexels.com/photos/11170599/pexels-photo-11170599.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/11170599/pexels-photo-11170599.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2642545/pexels-photo-2642545.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1435685/pexels-photo-1435685.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/296247/pexels-photo-296247.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Keep warm with this premium beanie.",category:"Accessories",stock:45,rating:4.1,reviews:[]},
    {id:8,name:"Leather Belt",price:34.00,image:"https://images.pexels.com/photos/31367058/pexels-photo-31367058.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/31367058/pexels-photo-31367058.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1391403/pexels-photo-1391403.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1186914/pexels-photo-1186914.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"High-quality leather belt.",category:"Accessories",stock:5,rating:3.9,reviews:[]},
    {id:9,name:"Urban Hoodie",price:54.00,image:"https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/5255242/pexels-photo-5255242.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/6311371/pexels-photo-6311371.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/4955083/pexels-photo-4955083.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Cozy oversized urban hoodie.",category:"Outerwear",stock:12,rating:4.6,reviews:[]},
    {id:10,name:"Floral Skirt",price:35.00,image:"https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1906785/pexels-photo-1906785.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2727206/pexels-photo-2727206.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2755203/pexels-photo-2755203.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Beautiful floral skirt for spring.",category:"Dresses",stock:20,rating:4.0,reviews:[]},
    {id:11,name:"Classic Polo",price:32.00,image:"https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/545475/pexels-photo-545475.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1035565/pexels-photo-1035565.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Timeless polo shirt.",category:"Tops",stock:3,rating:4.4,reviews:[]},
    {id:12,name:"Leather Boots",price:89.00,image:"https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/267304/pexels-photo-267304.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2897407/pexels-photo-2897407.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/207824/pexels-photo-207824.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Rugged leather boots.",category:"Footwear",stock:0,rating:4.8,reviews:[]},
    {id:13,name:"Silk Scarf",price:25.00,image:"https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=1260",images:["https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=1260","https://images.pexels.com/photos/2586297/pexels-photo-2586297.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1556403/pexels-photo-1556403.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Elegant silk scarf.",category:"Accessories",stock:50,rating:3.5,reviews:[]},
    {id:14,name:"Slim Fit Jeans",price:49.00,image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1260",images:["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1260","https://images.pexels.com/photos/298346/pexels-photo-298346.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/5255196/pexels-photo-5255196.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Durable slim-fit jeans.",category:"Pants",stock:10,rating:4.2,reviews:[]},
    {id:15,name:"Wool Overcoat",price:99.00,image:"https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=1260",images:["https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=1260","https://images.pexels.com/photos/2385471/pexels-photo-2385471.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/257851/pexels-photo-257851.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/937952/pexels-photo-937952.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Premium wool overcoat.",category:"Outerwear",stock:6,rating:4.6,reviews:[]},
    {id:16,name:"Wrist Watch",price:59.00,image:"https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1808253/pexels-photo-1808253.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Minimalist analog watch.",category:"Accessories",stock:25,rating:4.3,reviews:[]},
    {id:17,name:"Suede Loafers",price:69.00,image:"https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/267304/pexels-photo-267304.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1461634/pexels-photo-1461634.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/292634/pexels-photo-292634.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Elegant suede loafers.",category:"Footwear",stock:14,rating:4.1,reviews:[]},
    {id:18,name:"Aviator Sunglasses",price:45.00,image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1260",images:["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1260","https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/1187609/pexels-photo-1187609.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/422684/pexels-photo-422684.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Classic aviator sunglasses.",category:"Accessories",stock:35,rating:4.0,reviews:[]},
    {id:19,name:"V-Neck Sweater",price:49.00,image:"https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260",images:["https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/2870325/pexels-photo-2870325.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Soft wool V-neck sweater.",category:"Tops",stock:2,rating:4.0,reviews:[]},
    {id:20,name:"Cargo Pants",price:55.00,image:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=1260",images:["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=1260","https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260","https://images.pexels.com/photos/5255196/pexels-photo-5255196.jpeg?auto=compress&cs=tinysrgb&w=1260"],description:"Durable cargo pants.",category:"Pants",stock:11,rating:3.7,reviews:[]}
];

// ---- NOTIFICATION ----
const showNotification = (msg, icon = 'fa-circle-check', color = '#2ecc71') => {
    const notif = document.getElementById('notification');
    const notifMsg = document.getElementById('notification-msg');
    const notifIcon = notif.querySelector('i');
    notifIcon.className = `fa-solid ${icon}`;
    notif.style.background = color;
    notifMsg.innerText = msg;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 3000);
};

// ---- DEBOUNCE ----
const debounce = (func, wait) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => func.apply(this, args), wait); }; };

// ---- HIGHLIGHT ----
const highlightText = (text, term) => {
    if (!term) return text;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
};

// ---- STARS RENDER ----
const renderStars = (rating, size = '14px') => {
    rating = parseFloat(rating) || 0;
    const full = Math.floor(rating);
    const half = (rating - full) >= 0.5 ? 1 : 0;
    const empty = Math.max(0, 5 - full - half);
    const s = `style="font-size:${size};color:#f1c40f"`;
    const e = `style="font-size:${size};color:#ddd"`;
    return ('<i class="fa-solid fa-star" ' + s + '></i>').repeat(full) +
        (half ? '<i class="fa-solid fa-star-half-alt" ' + s + '></i>' : '') +
        ('<i class="fa-regular fa-star" ' + e + '></i>').repeat(empty);
};

// ---- COOKIE CONSENT ----
(() => {
    if (!localStorage.getItem('clothify_cookie_consent')) {
        document.getElementById('cookie-consent').style.display = 'flex';
    }
    document.getElementById('cookie-accept').addEventListener('click', () => {
        localStorage.setItem('clothify_cookie_consent', 'accepted');
        document.getElementById('cookie-consent').style.display = 'none';
        gtag('consent', 'update', { analytics_storage: 'granted' });
    });
    document.getElementById('cookie-decline').addEventListener('click', () => {
        localStorage.setItem('clothify_cookie_consent', 'declined');
        document.getElementById('cookie-consent').style.display = 'none';
    });
})();

// ---- COLOR VARIANTS MAP ----
const colorOptions = {
    'Tops': ['Black', 'White', 'Navy', 'Gray'],
    'Outerwear': ['Black', 'Brown', 'Olive', 'Navy'],
    'Dresses': ['Black', 'Red', 'Blue', 'Floral', 'White'],
    'Footwear': ['Black', 'Brown', 'White', 'Tan'],
    'Pants': ['Black', 'Navy', 'Khaki', 'Gray'],
    'Accessories': ['Black', 'Brown', 'Gold', 'Silver']
};

const colorHexMap = {
    'Black': '#1a1a1a', 'White': '#f0f0f0', 'Navy': '#1b2a4a', 'Gray': '#888',
    'Brown': '#6d4c2a', 'Olive': '#556b2f', 'Red': '#c0392b', 'Blue': '#2980b9',
    'Floral': '#e84393', 'Tan': '#d2b48c', 'Khaki': '#c3b091', 'Gold': '#d4a017',
    'Silver': '#a8a9ad'
};

// ---- IMAGE LIGHTBOX ----
let lightboxImages = [];
let lightboxIndex = 0;

const openLightbox = (images, index) => {
    lightboxImages = images;
    lightboxIndex = index;
    const lb = document.getElementById('image-lightbox');
    const img = document.getElementById('lightbox-img');
    if (images && images.length > 0) {
        img.src = images[index];
        document.getElementById('lightbox-counter').textContent = `${index + 1} / ${images.length}`;
    }
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    document.getElementById('image-lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
};

const navigateLightbox = (dir) => {
    if (!lightboxImages || lightboxImages.length === 0) return;
    lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
    document.getElementById('lightbox-img').src = lightboxImages[lightboxIndex];
    document.getElementById('lightbox-counter').textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
};

document.addEventListener('keydown', (e) => {
    if (!document.getElementById('image-lightbox').classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

document.getElementById('image-lightbox')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
});

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;

// ---- ABANDONED CART RECOVERY ----
const checkAbandonedCart = () => {
    const cartData = JSON.parse(localStorage.getItem('clothify_cart') || '[]');
    const dismissed = localStorage.getItem('clothify_abandoned_dismissed');
    if (dismissed) {
        const dismissedTime = parseInt(dismissed);
        if (Date.now() - dismissedTime < 86400000) return; // 24 hours
        localStorage.removeItem('clothify_abandoned_dismissed');
    }
    if (cartData.length > 0) {
        const user = JSON.parse(localStorage.getItem('clothify_user') || 'null');
        const subtotal = cartData.reduce((s, i) => s + (i.price * i.quantity), 0);
        fetch(`${API_BASE}/abandoned-cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId,
                email: user?.email || null,
                name: user?.name || null,
                cart: cartData,
                subtotal
            })
        }).catch(() => {});
        const msg = document.getElementById('abandoned-cart-msg');
        if (msg) {
            const count = cartData.reduce((s, i) => s + i.quantity, 0);
            msg.textContent = `You have ${count} item${count > 1 ? 's' : ''} in your cart (${formatPrice(subtotal)}) — complete your purchase!`;
        }
        setTimeout(() => {
            document.getElementById('abandoned-cart-banner')?.classList.add('show');
        }, 15000); // Show after 15 seconds
    }
};

const restoreAbandonedCart = () => {
    document.getElementById('abandoned-cart-banner')?.classList.remove('show');
    document.querySelector('.cart-icon')?.click();
};

const dismissAbandonedCart = () => {
    document.getElementById('abandoned-cart-banner')?.classList.remove('show');
    localStorage.setItem('clothify_abandoned_dismissed', Date.now().toString());
};

window.restoreAbandonedCart = restoreAbandonedCart;
window.dismissAbandonedCart = dismissAbandonedCart;

// ---- RETURN POLICY ----
const openReturnPolicy = () => {
    document.getElementById('return-policy-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
};
document.querySelector('.close-return-policy')?.addEventListener('click', () => {
    document.getElementById('return-policy-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});
window.openReturnPolicy = openReturnPolicy;

// ---- PRIVACY POLICY ----
const openPrivacyPolicy = () => {
    document.getElementById('privacy-policy-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
};
document.querySelector('.close-privacy-policy')?.addEventListener('click', () => {
    document.getElementById('privacy-policy-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});
window.openPrivacyPolicy = openPrivacyPolicy;

// ---- PAGE VIEW TRACKING ----
const trackPageView = (page, productId = null) => {
    fetch(`${API_BASE}/page-view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, productId, sessionId })
    }).catch(() => {});
};

// ---- LOAD PRODUCTS ----
const loadProducts = async () => {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = Array(8).fill(0).map(() => `
        <div class="skeleton-card">
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
        </div>
    `).join('');
    try {
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) {
            const data = await res.json();
            allProducts = Array.isArray(data) ? data : (data.products || data.data || productsData);
        } else throw new Error('API unavailable');
    } catch {
        allProducts = productsData;
    }
    renderProducts(allProducts);
    updateCartUI();
};

// ---- RENDER PRODUCTS ----
const renderProducts = (products, container = document.getElementById('product-grid'), term = '') => {
    container.innerHTML = '';
    if (products.length === 0) {
        if (container.id === 'search-results') {
            container.innerHTML = `<div class="empty-search"><i class="fa-solid fa-magnifying-glass"></i><p>Oops! We couldn't find anything for "<strong>${term}</strong>"</p><button class="btn" onclick="clearSearch()">Browse Collection</button></div>`;
        } else {
            container.innerHTML = '<p class="empty-msg">No products found</p>';
        }
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card reveal reveal-up';
        card.dataset.productId = product.id;
        const displayName = term ? highlightText(product.name, term) : product.name;
        const avgRating = (product.reviews && product.reviews.length > 0)
            ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length)
            : (product.reviews_count > 0 ? (product.rating || 0) : 0);
        const reviewCount = product.reviews ? product.reviews.length : (product.reviews_count || 0);

        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-id="${product.id}" aria-label="Toggle wishlist">
                    <i class="fa-${isInWishlist(product.id) ? 'solid' : 'regular'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3>${displayName}</h3>
                <div class="product-rating">
                    ${renderStars(avgRating)}
                    <span class="rating-count">${avgRating.toFixed(1)} (${reviewCount})</span>
                </div>
                <p class="price">${formatPrice(product.price)}</p>
                <button class="add-to-cart" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</button>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart') || e.target.closest('.wishlist-btn')) return;
            openProductModal(product);
        });

        card.querySelector('.add-to-cart').addEventListener('click', () => {
            if (product.stock > 0) addToCart(product, 1, card.querySelector('.add-to-cart'));
        });

        card.querySelector('.wishlist-btn').addEventListener('click', (e) => {
            e.stopPropagation(); toggleWishlist(product);
        });

        container.appendChild(card);
    });

    container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
};

// ---- CART ----
const addToCart = (product, qty, button) => {
    const existing = cart.find(i => i.id === product.id && i.selectedSize === product.selectedSize);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ ...product, quantity: qty });
    }
    saveCart();
    updateCartUI();
    if (button) {
        const orig = button.innerText;
        button.innerText = 'Added!';
        button.style.backgroundColor = '#e67e22';
        setTimeout(() => { button.innerText = orig; button.style.backgroundColor = ''; }, 1000);
        if (!button.dataset.noNotif) showNotification(`${product.name} added to cart!`, 'fa-circle-check', '#2ecc71');
    }
};
const removeFromCart = (id) => { cart = cart.filter(i => i.id !== id); saveCart(); updateCartUI(); };
const updateQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) removeFromCart(id);
        else { saveCart(); updateCartUI(); }
    }
};
const saveCart = () => {
    localStorage.setItem('clothify_cart', JSON.stringify(cart));
    syncCartToServer();
};
const saveWishlist = () => {
    localStorage.setItem('clothify_wishlist', JSON.stringify(wishlist));
    syncWishlistToServer();
};
const isInWishlist = (id) => wishlist.some(p => p.id === id);

const toggleWishlist = (product) => {
    const idx = wishlist.findIndex(p => p.id === product.id);
    const msg = idx > -1
        ? (translations[currentLang].wishlist_removed || 'Removed from wishlist')
        : (translations[currentLang].wishlist_added || 'Added to wishlist');
    if (idx > -1) wishlist.splice(idx, 1);
    else wishlist.push(product);
    showNotification(msg);
    saveWishlist();
    renderProducts(allProducts);
};

function showWishlistOnly() {
    if (currentFilter === 'wishlist') {
        currentFilter = null;
        document.getElementById('wishlist-toggle')?.classList.remove('active');
        renderProducts(sortProducts(allProducts, currentSort));
    } else {
        currentFilter = 'wishlist';
        document.getElementById('wishlist-toggle')?.classList.add('active');
        renderProducts(sortProducts(wishlist, currentSort));
    }
}

const updateCartUI = () => {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalQty;
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart"><i class="fa-solid fa-bag-shopping"></i><p>Your cart is empty</p><span>Browse our collection and add items</span></div>';
        document.getElementById('cart-total-amount').innerText = '0.00 €';
        return;
    }
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4>${item.name} ${item.selectedSize ? `<span class="cart-item-size">(${item.selectedSize})</span>` : ''}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
            </div>
        `;
        container.appendChild(el);
    });
    document.getElementById('cart-total-amount').innerText = formatPrice(total);
};

window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// ---- COUPON ----
const couponDatabase_ = { SAVE10:10, WELCOME20:20, FREESHIP:0 };
let appliedCoupon_ = null;
document.getElementById('apply-coupon-btn')?.addEventListener('click', () => {
    const input = document.getElementById('coupon-input');
    const msg = document.getElementById('coupon-message');
    const code = input.value.trim().toUpperCase();
    if (!code) { msg.textContent = 'Enter a coupon code'; msg.className = 'coupon-message error'; return; }
    if (appliedCoupon_) { msg.textContent = 'Coupon already applied'; msg.className = 'coupon-message error'; return; }
    if (couponDatabase_[code] !== undefined) {
        appliedCoupon_ = code;
        msg.textContent = `Coupon applied! ${couponDatabase_[code] > 0 ? couponDatabase_[code] + '% off' : 'Free shipping'}!`;
        msg.className = 'coupon-message success';
        updateCartUI();
    } else {
        msg.textContent = 'Invalid coupon code';
        msg.className = 'coupon-message error';
    }
});

// ---- SEARCH ----
const fetchSearchResults = (query) => {
    const results = document.getElementById('search-results');
    const info = document.querySelector('.search-info');
    if (query.length < 2) { results.innerHTML = ''; info.style.display = 'flex'; return; }
    info.style.display = 'none';
    const q = query.toLowerCase();
    const found = allProducts.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    renderProducts(found, results, query);
    if (found.length > 0) saveSearchHistory(query);
};
const saveSearchHistory = (term) => {
    term = term.trim().toLowerCase();
    if (!term) return;
    searchHistory = searchHistory.filter(h => h !== term);
    searchHistory.unshift(term);
    searchHistory = searchHistory.slice(0, 5);
    localStorage.setItem('clothify_search_history', JSON.stringify(searchHistory));
    displaySearchHistory();
};
const displaySearchHistory = () => {
    const container = document.getElementById('search-history');
    if (searchHistory.length === 0) { container.innerHTML = ''; return; }
    container.innerHTML = '<h4>Recent Searches</h4>';
    searchHistory.forEach(term => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `<span>${term}</span><i class="fa-solid fa-xmark remove-history" data-term="${term}"></i>`;
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-history')) { e.stopPropagation(); removeHistoryItem(term); return; }
            document.getElementById('search-input').value = term;
            fetchSearchResults(term);
        });
        container.appendChild(item);
    });
};
const removeHistoryItem = (term) => {
    searchHistory = searchHistory.filter(h => h !== term);
    localStorage.setItem('clothify_search_history', JSON.stringify(searchHistory));
    displaySearchHistory();
};
const clearSearch = () => {
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
    document.querySelector('.search-info').style.display = 'flex';
    toggleSearch();
    window.scrollTo({ top: document.getElementById('collection').offsetTop - 80, behavior: 'smooth' });
};
const toggleSearch = () => {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
        document.getElementById('search-input').focus();
        document.body.style.overflow = 'hidden';
        displaySearchHistory();
    } else {
        document.body.style.overflow = 'auto';
        document.getElementById('search-input').value = '';
        document.getElementById('search-results').innerHTML = '';
        document.querySelector('.search-info').style.display = 'flex';
    }
};
const debouncedSearch = debounce((e) => fetchSearchResults(e.target.value), 300);
document.getElementById('search-input').addEventListener('input', debouncedSearch);
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        const term = tag.innerText;
        document.getElementById('search-input').value = term;
        fetchSearchResults(term);
    });
});
document.querySelector('.search-btn').addEventListener('click', toggleSearch);
document.querySelector('.close-search').addEventListener('click', toggleSearch);
window.clearSearch = clearSearch;

// ---- RECENTLY VIEWED ----
const addToRecentlyViewed = (product) => {
    recentlyViewed = recentlyViewed.filter(p => p.id !== product.id);
    recentlyViewed.unshift(product);
    recentlyViewed = recentlyViewed.slice(0, 8);
    localStorage.setItem('clothify_recently_viewed', JSON.stringify(recentlyViewed));
};
const renderRecentlyViewed = () => {
    const section = document.getElementById('recently-viewed');
    const grid = document.getElementById('recently-grid');
    if (!recentlyViewed.length) { section.style.display = 'none'; return; }
    section.style.display = 'block';
    grid.innerHTML = '';
    recentlyViewed.slice(0, 6).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" style="height:200px;">
            </div>
            <div class="product-info">
                <h3 style="font-size:14px;">${product.name}</h3>
                <p class="price" style="font-size:14px;">${formatPrice(product.price)}</p>
            </div>
        `;
        card.addEventListener('click', () => openProductModal(product));
        grid.appendChild(card);
    });
};

// ---- KEYBOARD ACCESSIBILITY ----
document.querySelectorAll('[role="button"]').forEach(el => {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
});

// ---- CART DRAWER / CHECKOUT ----
document.querySelector('.cart-icon').addEventListener('click', () => {
    document.getElementById('cart-drawer').classList.add('active');
    document.body.style.overflow = 'hidden';
});
document.querySelector('.close-cart').addEventListener('click', () => {
    document.getElementById('cart-drawer').classList.remove('active');
    document.body.style.overflow = 'auto';
});

// ---- SIZE CHART ----
const sizeChartData = {
    tops: { sizes: ['XS','S','M','L','XL','XXL'], chest: ['34-36','36-38','38-40','40-42','42-44','44-46'], waist: ['28-30','30-32','32-34','34-36','36-38','38-40'] },
    bottoms: { sizes: ['XS','S','M','L','XL','XXL'], waist: ['28-30','30-32','32-34','34-36','36-38','38-40'], inseam: ['30','30','32','32','34','34'] },
    footwear: { sizes: ['38','39','40','41','42','43','44','45'], eu: ['38','39','40','41','42','43','44','45'], us: ['6','6.5','7','8','9','10','11','12'] }
};
const openSizeChart = () => {
    const modal = document.getElementById('size-chart-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    renderSizeChart('tops');
};
const renderSizeChart = (cat) => {
    const wrapper = document.getElementById('size-chart-table-wrapper');
    const data = sizeChartData[cat];
    if (!data) return;
    let html = '<table class="size-chart-table"><thead><tr>';
    Object.keys(data).forEach(key => { html += `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`; });
    html += '</tr></thead><tbody>';
    const rows = data[Object.keys(data)[0]].length;
    for (let i = 0; i < rows; i++) {
        html += '<tr>';
        Object.keys(data).forEach(key => { html += `<td>${data[key][i] || '-'}</td>`; });
        html += '</tr>';
    }
    html += '</tbody></table>';
    wrapper.innerHTML = html;
};
document.querySelectorAll('.size-chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.size-chart-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSizeChart(tab.dataset.cat);
    });
});
document.querySelector('.close-size-chart')?.addEventListener('click', () => {
    document.getElementById('size-chart-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});
window.openSizeChart = openSizeChart;

// ---- MODAL ----
const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalStock = document.getElementById('modal-stock');
const modalDesc = document.getElementById('modal-desc');
const productQty = document.getElementById('product-qty');
let currentModalProduct = null;

const renderRelatedProducts = (category, excludeId) => {
    const relatedGrid = document.getElementById('related-grid');
    const related = allProducts.filter(p => p.category === category && p.id !== excludeId).slice(0, 4);
    relatedGrid.innerHTML = '';
    if (!related.length) { relatedGrid.parentElement.style.display = 'none'; return; }
    relatedGrid.parentElement.style.display = 'block';
    related.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy">
                <button class="wishlist-btn ${isInWishlist(p.id) ? 'active' : ''}" data-id="${p.id}"><i class="fa-${isInWishlist(p.id) ? 'solid' : 'regular'} fa-heart"></i></button>
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">${formatPrice(p.price)}</p>
            </div>
        `;
        card.querySelector('.wishlist-btn')?.addEventListener('click', (e) => { e.stopPropagation(); toggleWishlist(p); });
        card.addEventListener('click', () => openProductModal(p));
        relatedGrid.appendChild(card);
    });
};

const openProductModal = (product) => {
    currentModalProduct = product;
    modalImg.src = product.image;
    modalTitle.innerText = product.name;
    modalPrice.innerText = formatPrice(product.price);
    modalDesc.innerText = product.description || 'Premium quality apparel.';
    productQty.value = 1;

    // Stock
    if (product.stock === 0) {
        modalStock.textContent = 'Out of Stock';
        modalStock.className = 'modal-stock out-of-stock';
    } else if (product.stock <= 5) {
        modalStock.textContent = `Only ${product.stock} left in stock`;
        modalStock.className = 'modal-stock low-stock';
    } else {
        modalStock.textContent = 'In Stock';
        modalStock.className = 'modal-stock in-stock';
    }

    // Rating
    const avgRating = (product.reviews && product.reviews.length > 0)
        ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length)
        : (product.reviews_count > 0 ? (product.rating || 0) : 0);
    const reviewCount = product.reviews ? product.reviews.length : (product.reviews_count || 0);
    const ratingEl = document.getElementById('modal-rating');
    ratingEl.innerHTML = renderStars(avgRating, '18px') + ` <span style="color:#888;font-size:14px;margin-left:4px;">(${reviewCount})</span>`;

    // Sizes
    const sizeOptions = document.getElementById('size-options');
    const cat = (product.category || '').toLowerCase();
    let sizes;
    if (cat === 'footwear') sizes = ['38','39','40','41','42','43','44'];
    else if (cat === 'accessories') sizes = ['One Size'];
    else sizes = ['S','M','L','XL'];
    sizeOptions.innerHTML = sizes.map((s, i) => `<button class="size-btn${i === 0 ? ' active' : ''}" data-size="${s}">${s}</button>`).join('');
    sizeOptions.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sizeOptions.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Lightbox click on main image
    const imgs = product.images && product.images.length > 0 ? product.images : [product.image, product.image, product.image, product.image];
    modalImg.style.cursor = 'pointer';
    modalImg.onclick = () => openLightbox(imgs, 0);

    // Color Variants
    const colorContainer = document.getElementById('color-options');
    if (colorContainer) {
        colorContainer.innerHTML = '';
        const cat = product.category || 'Tops';
        const colors = colorOptions[cat] || ['Black', 'White'];
        colors.forEach((color, i) => {
            const swatch = document.createElement('span');
            swatch.className = `color-swatch${i === 0 ? ' active' : ''}`;
            swatch.style.background = colorHexMap[color] || '#ccc';
            swatch.title = color;
            swatch.dataset.color = color;
            swatch.addEventListener('click', () => {
                colorContainer.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
            });
            colorContainer.appendChild(swatch);
        });
    }

    // Reviews
    fetchReviews(product);
    renderRelatedProducts(product.category, product.id);
    addToRecentlyViewed(product);
    renderRecentlyViewed();

    // Compare btn
    const cmpBtn = document.getElementById('compare-toggle-btn');
    const inCompare = compareList.some(p => p.id === product.id);
    cmpBtn.classList.toggle('active', inCompare);
    cmpBtn.innerHTML = `<i class="fa-solid fa-scale-balanced"></i> ${inCompare ? 'Added' : 'Compare'}`;

    if (document.getElementById('search-overlay').classList.contains('active')) toggleSearch();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

document.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});
window.addEventListener('click', (e) => {
    if (e.target === modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
    if (e.target === document.getElementById('search-overlay')) toggleSearch();
});

// Quantity
document.querySelector('.plus').addEventListener('click', () => { productQty.value = parseInt(productQty.value) + 1; });
document.querySelector('.minus').addEventListener('click', () => { if (parseInt(productQty.value) > 1) productQty.value = parseInt(productQty.value) - 1; });

// Add to Cart from Modal
document.querySelector('.add-to-cart-modal').addEventListener('click', function() {
    if (currentModalProduct) {
        if (currentModalProduct.stock === 0) { showNotification('Out of Stock!', 'fa-exclamation-circle', '#e74c3c'); return; }
        const qty = parseInt(productQty.value);
        const selectedSize = document.querySelector('#size-options .size-btn.active')?.dataset?.size || 'M';
        addToCart({ ...currentModalProduct, selectedSize }, qty, this);
        setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }, 800);
    }
});

// ---- REVIEWS ----
const fetchReviews = async (product) => {
    try {
        const res = await fetch(`${API_BASE}/reviews/${product.id}`);
        if (res.ok) {
            const data = await res.json();
            if (data.reviews && data.reviews.length) {
                product.reviews = data.reviews.map(r => ({
                    rating: r.rating,
                    text: r.comment || '',
                    author: r.user_name,
                    date: r.created_at
                }));
            } else if (!product.reviews) {
                product.reviews = [];
            }
        }
    } catch {}
    renderReviews(product);
    const avgRating = (product.reviews && product.reviews.length > 0)
        ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length)
        : (product.reviews_count > 0 ? (product.rating || 0) : 0);
    const ratingEl = document.getElementById('modal-rating');
    if (ratingEl) {
        ratingEl.innerHTML = renderStars(avgRating, '18px') + ` <span style="color:#888;font-size:14px;margin-left:4px;">(${product.reviews ? product.reviews.length : (product.reviews_count || 0)})</span>`;
    }
    const card = document.querySelector(`.product-card[data-product-id="${product.id}"]`);
    if (card) {
        const reviews = product.reviews || [];
        const avg = reviews.length
            ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
            : ((product.reviews_count || 0) > 0 ? (product.rating || 0) : 0);
        const cnt = reviews.length || (product.reviews_count || 0);
        card.querySelector('.product-rating').innerHTML =
            renderStars(avg) + `<span class="rating-count">(${cnt})</span>`;
    }
};

const renderReviews = (product) => {
    const summary = document.getElementById('reviews-summary');
    const list = document.getElementById('reviews-list');
    const reviews = product.reviews || [];
    const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
    summary.innerHTML = `
        <span class="avg-rating">${avg}</span>
        <div class="stars">${renderStars(parseFloat(avg))}</div>
        <span class="total-reviews">${reviews.length} review${reviews.length !== 1 ? 's' : ''}</span>
    `;
    list.innerHTML = '';
    if (!reviews.length) { list.innerHTML = '<p style="color:#888;text-align:center;padding:16px;">No reviews yet. Be the first!</p>'; return; }
    reviews.slice().reverse().forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
            <div class="review-header">
                <span class="review-stars">${renderStars(r.rating)}</span>
                <span class="review-author">${r.author || 'Anonymous'}</span>
                <span class="review-date">${new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <p class="review-text">${r.text}</p>
        `;
        list.appendChild(div);
    });
};

let selectedReviewRating = 0;
document.querySelectorAll('#star-rating-input i').forEach(star => {
    star.addEventListener('click', () => {
        selectedReviewRating = parseInt(star.dataset.star);
        document.querySelectorAll('#star-rating-input i').forEach(s => {
            s.className = parseInt(s.dataset.star) <= selectedReviewRating ? 'fa-solid fa-star active' : 'fa-regular fa-star';
        });
    });
    star.addEventListener('mouseenter', () => {
        const val = parseInt(star.dataset.star);
        document.querySelectorAll('#star-rating-input i').forEach(s => {
            s.className = parseInt(s.dataset.star) <= val ? 'fa-solid fa-star' : 'fa-regular fa-star';
        });
    });
    star.addEventListener('mouseleave', () => {
        document.querySelectorAll('#star-rating-input i').forEach(s => {
            s.className = parseInt(s.dataset.star) <= selectedReviewRating ? 'fa-solid fa-star active' : 'fa-regular fa-star';
        });
    });
});

document.getElementById('submit-review-btn')?.addEventListener('click', async () => {
    if (!currentModalProduct) return;
    if (!selectedReviewRating) { showNotification('Please select a rating', 'fa-star', '#e74c3c'); return; }
    const text = document.getElementById('review-text').value.trim();
    if (!text) { showNotification('Please write a review', 'fa-pen', '#e74c3c'); return; }
    const userName = currentUser ? currentUser.name : 'Anonymous';
    try {
        const res = await fetch(`${API_BASE}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: currentModalProduct.id, userName, rating: selectedReviewRating, comment: text })
        });
        if (!res.ok) throw new Error('Failed to submit');
    } catch {
        showNotification('Could not save review to server', 'fa-exclamation-triangle', '#e67e22');
    }
    if (!currentModalProduct.reviews) currentModalProduct.reviews = [];
    currentModalProduct.reviews.push({
        rating: selectedReviewRating,
        text: text,
        author: userName,
        date: new Date().toISOString()
    });
    renderReviews(currentModalProduct);
    const card = document.querySelector(`.product-card[data-product-id="${currentModalProduct.id}"]`);
    if (card) {
        const reviews = currentModalProduct.reviews || [];
        const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;
        card.querySelector('.product-rating').innerHTML =
            renderStars(avg) + `<span class="rating-count">(${reviews.length})</span>`;
    }
    document.getElementById('review-text').value = '';
    selectedReviewRating = 0;
    document.querySelectorAll('#star-rating-input i').forEach(s => s.className = 'fa-regular fa-star');
    showNotification('Review submitted!', 'fa-star', '#2ecc71');
});

// ---- COMPARE ----
const addToCompare = (product) => {
    if (compareList.length >= 4) { showNotification('Max 4 products to compare', 'fa-scale-balanced', '#e74c3c'); return; }
    if (compareList.some(p => p.id === product.id)) return;
    compareList.push(product);
    localStorage.setItem('clothify_compare', JSON.stringify(compareList));
    updateCompareUI();
    showNotification(`${product.name} added to compare`, 'fa-scale-balanced', '#2ecc71');
};
const removeFromCompare = (id) => {
    compareList = compareList.filter(p => p.id !== id);
    localStorage.setItem('clothify_compare', JSON.stringify(compareList));
    updateCompareUI();
    renderProducts(allProducts);
};
const clearCompare = () => {
    compareList = [];
    localStorage.setItem('clothify_compare', JSON.stringify(compareList));
    updateCompareUI();
    renderProducts(allProducts);
};
const updateCompareUI = () => {
    document.getElementById('compare-count').innerText = compareList.length;
    document.getElementById('compare-count-label').innerText = compareList.length;
    const body = document.getElementById('compare-body');
    if (!compareList.length) {
        body.innerHTML = '<div class="compare-empty"><i class="fa-solid fa-scale-balanced"></i><p>Add products to compare</p></div>';
        return;
    }
    body.innerHTML = '';
    compareList.forEach(p => {
        const card = document.createElement('div');
        card.className = 'compare-card';
        card.innerHTML = `
            <i class="fa-solid fa-xmark remove-compare" onclick="removeFromCompare(${p.id})"></i>
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <div class="compare-price">${formatPrice(p.price)}</div>
            <div class="compare-attr">Category: ${p.category}</div>
            <div class="compare-attr">Stock: ${p.stock > 0 ? p.stock : 'Out of Stock'}</div>
            <div class="compare-attr">Rating: ${renderStars(p.rating || 0)}</div>
        `;
        body.appendChild(card);
    });
};
const toggleCompareFromModal = () => {
    if (!currentModalProduct) return;
    const inCompare = compareList.some(p => p.id === currentModalProduct.id);
    if (inCompare) {
        removeFromCompare(currentModalProduct.id);
        document.getElementById('compare-toggle-btn').classList.remove('active');
        document.getElementById('compare-toggle-btn').innerHTML = '<i class="fa-solid fa-scale-balanced"></i> Compare';
    } else {
        addToCompare(currentModalProduct);
        document.getElementById('compare-toggle-btn').classList.add('active');
        document.getElementById('compare-toggle-btn').innerHTML = '<i class="fa-solid fa-scale-balanced"></i> Added';
    }
};
document.getElementById('compare-btn')?.addEventListener('click', () => {
    document.getElementById('compare-drawer').classList.toggle('active');
});
document.querySelector('.close-compare')?.addEventListener('click', () => {
    document.getElementById('compare-drawer').classList.remove('active');
});
window.compareList = compareList;
window.addToCompare = addToCompare;
window.removeFromCompare = removeFromCompare;
window.clearCompare = clearCompare;
window.toggleCompareFromModal = toggleCompareFromModal;

// ---- STICKY NAVBAR ----
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('compact', window.scrollY > 50));

// ---- BACK TO TOP ----
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 400));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

// ---- REVEAL OBSERVER ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('active'); revealObserver.unobserve(entry.target); }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- CATEGORIES ----
const fetchCategories = () => {
    const cats = [...new Set(allProducts.map(p => p.category))].sort();
    renderMobileCategories(cats);
};
const renderMobileCategories = (categories) => {
    const list = document.getElementById('mobile-category-list');
    list.innerHTML = '';
    categories.forEach(cat => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#collection';
        a.innerText = cat;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            filterProductsByCategory(cat);
            toggleMenu();
            window.scrollTo({ top: document.getElementById('collection').offsetTop - 80, behavior: 'smooth' });
        });
        li.appendChild(a);
        list.appendChild(li);
    });
};

// ---- SORT ----
const sortProducts = (products, sortBy) => {
    const sorted = [...products];
    switch (sortBy) {
        case 'price-asc': sorted.sort((a, b) => a.price - b.price); break;
        case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
        case 'name-asc': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'name-desc': sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
        case 'rating': sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
        default: break;
    }
    return sorted;
};

document.getElementById('sort-select')?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    let source;
    if (currentFilter === 'wishlist') source = [...wishlist];
    else if (currentFilter) source = allProducts.filter(p => p.category === currentFilter);
    else source = allProducts;
    renderProducts(sortProducts(source, currentSort));
});

const filterProductsByCategory = (category) => {
    currentFilter = category;
    document.getElementById('wishlist-toggle')?.classList.remove('active');
    const filtered = sortProducts(allProducts.filter(p => p.category === category), currentSort);
    renderProducts(filtered, document.getElementById('product-grid'), '');
    const title = document.querySelector('#collection .section-title');
    title.innerText = `${category} Collection`;
    let clearBtn = document.getElementById('clear-filter');
    if (!clearBtn) {
        clearBtn = document.createElement('button');
        clearBtn.id = 'clear-filter';
        clearBtn.className = 'btn';
        clearBtn.style.margin = '20px auto';
        clearBtn.style.display = 'block';
        clearBtn.innerText = 'Show All Products';
        clearBtn.onclick = () => {
            currentFilter = null; currentSort = 'default';
            document.getElementById('sort-select').value = 'default';
            renderProducts(allProducts);
            title.innerText = 'Our Collection';
            clearBtn.remove();
        };
        document.querySelector('#collection .container').appendChild(clearBtn);
    }
};

// ---- CHECKOUT ----
const checkoutModal = document.getElementById('checkout-modal');
const checkoutItemsContainer = document.getElementById('checkout-items');
const orderForm = document.getElementById('order-form');

const getShippingCost = () => {
    const selected = document.querySelector('input[name="shipping"]:checked');
    if (!selected) return 5;
    switch (selected.value) { case 'express': return 12; case 'nextday': return 20; default: return 5; }
};

const getTaxRate = (country) => {
    switch (country) { case 'EU': return 0.20; case 'US': return 0.10; case 'UK': return 0.20; default: return 0.05; }
};

const getCouponDiscount = (subtotal) => {
    if (!appliedCoupon_) return 0;
    const pct = couponDatabase_[appliedCoupon_];
    if (pct === undefined) return 0;
    if (pct === 0) return 0; // free shipping handled elsewhere
    return subtotal * pct / 100;
};

const hasFreeShipping = () => {
    return appliedCoupon_ === 'FREESHIP';
};

const updateCheckoutSummary = () => {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = hasFreeShipping() ? 0 : getShippingCost();
    const country = document.getElementById('country')?.value || 'EU';
    const taxRate = getTaxRate(country);
    const discount = getCouponDiscount(subtotal);
    const discountedSubtotal = subtotal - discount;
    const tax = discountedSubtotal * taxRate;
    const total = discountedSubtotal + shipping + tax;

    document.getElementById('checkout-subtotal').innerText = formatPrice(subtotal);
    document.getElementById('checkout-shipping').innerText = shipping === 0 ? 'Free' : formatPrice(shipping);
    document.getElementById('checkout-tax').innerText = formatPrice(tax);
    document.getElementById('checkout-coupon').innerText = discount > 0 ? '-' + formatPrice(discount) : '-';
    document.getElementById('checkout-total').innerText = formatPrice(total);

    // Update shipping labels
    const free = subtotal >= 100 || hasFreeShipping();
    document.querySelectorAll('.shipping-option').forEach(opt => {
        const input = opt.querySelector('input');
        if (input.value === 'standard') {
            opt.querySelector('.shipping-price').textContent = free ? 'Free' : '5.00 €';
            if (free) { input.checked = true; input.disabled = false; }
        }
    });
};

document.querySelectorAll('input[name="shipping"]').forEach(r => r.addEventListener('change', updateCheckoutSummary));
document.getElementById('country')?.addEventListener('change', updateCheckoutSummary);

const openCheckoutModal = () => {
    if (cart.length === 0) { showNotification('Your cart is empty!', 'fa-cart-shopping', '#e74c3c'); return; }
    checkoutItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const el = document.createElement('div');
        el.className = 'summary-item';
        el.innerHTML = `<span>${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ''} x ${item.quantity}</span><span>${formatPrice(parseFloat(item.price) * item.quantity)}</span>`;
        checkoutItemsContainer.appendChild(el);
    });
    updateCheckoutSummary();
    document.getElementById('cart-drawer').classList.remove('active');
    checkoutModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};
document.querySelector('.checkout-btn').addEventListener('click', openCheckoutModal);
document.querySelector('.close-checkout').addEventListener('click', () => {
    checkoutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// ─── Luhn Card Validation ──────────────────────────────────────────

function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0, alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

async function processCardPayment(cardData, amount) {
  const res = await fetch(`${API_BASE}/process-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cardData)
  });
  return await res.json();
}

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = orderForm.querySelector('.place-order-btn');
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const country = document.getElementById('country').value;
    const shipping = hasFreeShipping() ? 0 : getShippingCost();
    const taxRate = getTaxRate(country);
    const discount = getCouponDiscount(subtotal);
    const discountedSubtotal = subtotal - discount;
    const tax = discountedSubtotal * taxRate;
    const total = discountedSubtotal + shipping + tax;

    submitBtn.disabled = true;
    submitBtn.innerText = 'Processing...';

    (async () => {
      let paymentId = null;
      let paymentStatus = 'Pending';

      if (paymentMethod === 'Card') {
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        const cardHolder = document.getElementById('card-name')?.value || '';

        if (!cardNumber || !cardExpiry || !cardCvv) {
          showNotification('Please fill in all card details', 'fa-credit-card', '#e74c3c');
          submitBtn.disabled = false; submitBtn.innerText = 'Place Order';
          return;
        }
        if (!luhnCheck(cardNumber)) {
          showNotification('Invalid card number', 'fa-credit-card', '#e74c3c');
          submitBtn.disabled = false; submitBtn.innerText = 'Place Order';
          return;
        }

        const paymentResult = await processCardPayment({
          cardNumber, cardExpiry, cardCvv, cardHolder,
          amount: total,
          currency: 'EUR'
        });

        if (!paymentResult.success) {
          showNotification(paymentResult.error || 'Payment failed', 'fa-credit-card', '#e74c3c');
          submitBtn.disabled = false; submitBtn.innerText = 'Place Order';
          return;
        }

        paymentId = paymentResult.paymentId;
        paymentStatus = 'Paid';
      }

      const orderData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        country: country,
        shipping: document.querySelector('input[name="shipping"]:checked')?.value || 'standard',
        cart: cart,
        subtotal: subtotal,
        shippingCost: shipping,
        tax: tax,
        coupon: appliedCoupon_,
        discount: discount,
        total: total,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
        paymentId: paymentId,
      };

      let orderId = Date.now();
      let status = 'pending';
      try {
          const res = await fetch(`${API_BASE}/orders`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(orderData)
          });
          if (res.ok) {
              const data = await res.json();
              orderId = data.orderId || data.order?.id || orderId;
          } else throw new Error('API failed');
      } catch {
          const orders = JSON.parse(localStorage.getItem('clothify_orders') || '[]');
          orders.push({ id: orderId, ...orderData, status: 'pending', date: new Date().toISOString() });
          localStorage.setItem('clothify_orders', JSON.stringify(orders));
      }

      cart.forEach(item => {
          const p = allProducts.find(pr => pr.id === item.id);
          if (p) p.stock = Math.max(0, p.stock - item.quantity);
      });

      if (currentUser) {
          const userOrders = JSON.parse(localStorage.getItem('clothify_user_orders_' + currentUser.email) || '[]');
          userOrders.push({ id: orderId, total, status, date: new Date().toISOString(), items: [...cart] });
          localStorage.setItem('clothify_user_orders_' + currentUser.email, JSON.stringify(userOrders));
      }

      showNotification(`Order placed! #${orderId}`, 'fa-circle-check', '#2ecc71');
      if (paymentMethod === 'Card') {
        document.getElementById('card-number').value = '';
        document.getElementById('card-expiry').value = '';
        document.getElementById('card-cvv').value = '';
      }
      cart = []; appliedCoupon_ = null; document.getElementById('coupon-input').value = '';
      document.getElementById('coupon-message').textContent = '';
      saveCart();
      updateCartUI();
      checkoutModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      orderForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerText = 'Place Order';
      renderProducts(allProducts);
    })();
});

// ---- ORDER TRACKING ----
const openOrderTracking = () => {
    document.getElementById('order-tracking-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.getElementById('tracking-result').innerHTML = '';
};
document.querySelector('.close-tracking')?.addEventListener('click', () => {
    document.getElementById('order-tracking-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});
document.getElementById('tracking-btn')?.addEventListener('click', () => {
    const input = document.getElementById('tracking-input').value.trim();
    const result = document.getElementById('tracking-result');
    if (!input) { result.innerHTML = '<p style="color:#e74c3c;">Please enter an order ID</p>'; return; }
    const allOrders = JSON.parse(localStorage.getItem('clothify_orders') || '[]');
    const order = allOrders.find(o => o.id == input || o.id === input);
    if (!order) {
        result.innerHTML = '<p style="color:#e74c3c;">Order not found. Please check your order ID.</p>';
        return;
    }
    const statusOrder = ['pending', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];
    const statusLabels = { pending:'Order Placed', confirmed:'Confirmed', shipped:'Shipped', out_for_delivery:'Out for Delivery', delivered:'Delivered' };
    const currentIdx = statusOrder.indexOf(order.status || 'pending');
    let steps = '';
    statusOrder.forEach((s, i) => {
        let cls = i < currentIdx ? 'completed' : (i === currentIdx ? 'active' : 'pending');
        let icon = i < currentIdx ? 'fa-check' : (i === currentIdx ? 'fa-spinner' : 'fa-clock');
        steps += `
            <div class="tracking-step">
                <div class="step-icon ${cls}"><i class="fa-solid ${icon}"></i></div>
                <div class="step-info">
                    <strong>${statusLabels[s]}</strong>
                    ${i === currentIdx ? '<span>Current</span>' : ''}
                </div>
            </div>
        `;
    });
    result.innerHTML = `
        <div style="margin-bottom:16px;"><strong>Order #${order.id}</strong> | ${new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} | Total: ${formatPrice(order.total || 0)}</div>
        <div class="tracking-timeline">${steps}</div>
    `;
});
window.openOrderTracking = openOrderTracking;

// ---- ACCOUNT ----
const getInitials = (name) => {
    return name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'U';
};

const openAccountDashboard = async () => {
    if (!currentUser) {
        openAuthModal();
        switchAuthTab('login');
        return;
    }
    const avatarEl = document.getElementById('account-avatar-el');
    if (avatarEl) avatarEl.textContent = getInitials(currentUser.name);
    document.getElementById('account-welcome').textContent = currentUser.name;
    document.getElementById('account-email').textContent = currentUser.email;
    document.getElementById('account-name').value = currentUser.name || '';
    document.getElementById('account-email-input').value = currentUser.email || '';
    document.getElementById('account-phone').value = currentUser.phone || '';
    document.getElementById('account-address').value = currentUser.address || '';

    const token = localStorage.getItem('clothify_token');
    if (token) {
        try {
            const res = await fetch(`${API_BASE}/user/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.user) {
                    currentUser = data.user;
                    localStorage.setItem('clothify_user', JSON.stringify(currentUser));
                    if (avatarEl) avatarEl.textContent = getInitials(currentUser.name);
                    document.getElementById('account-welcome').textContent = currentUser.name;
                    document.getElementById('account-email').textContent = currentUser.email;
                    document.getElementById('account-name').value = currentUser.name || '';
                    document.getElementById('account-email-input').value = currentUser.email || '';
                    document.getElementById('account-phone').value = currentUser.phone || '';
                    document.getElementById('account-address').value = currentUser.address || '';
                }
            }
        } catch {}
    }

    // Orders (from server)
    const ordersList = document.getElementById('account-orders-list');
    ordersList.innerHTML = '<p class="empty-state">Loading orders...</p>';
    if (token) {
        try {
            const res = await fetch(`${API_BASE}/user/orders`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                const serverOrders = await res.json();
                if (!serverOrders.length) {
                    ordersList.innerHTML = '<p class="empty-state">No orders yet.</p>';
                } else {
                    ordersList.innerHTML = '';
                    serverOrders.forEach(o => {
                        const card = document.createElement('div');
                        card.className = 'order-history-card';
                        const statusClass = (o.status || 'pending').toLowerCase().replace(/\s+/g, '_');
                        card.innerHTML = `
                            <div class="order-header">
                                <span class="order-id">#${o.id}</span>
                                <span class="order-status ${statusClass}">${(o.status || 'Pending').replace('_',' ')}</span>
                            </div>
                            <div class="order-meta">${new Date(o.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} &middot; ${o.items ? o.items.length : 0} item(s) &middot; ${formatPrice(o.total_amount || 0)}</div>
                        `;
                        ordersList.appendChild(card);
                    });
                }
            } else {
                ordersList.innerHTML = '<p class="empty-state">Could not load orders.</p>';
            }
        } catch {
            ordersList.innerHTML = '<p class="empty-state">Could not load orders.</p>';
        }
    } else {
        ordersList.innerHTML = '<p class="empty-state">No orders yet.</p>';
    }

    // Wishlist
    const wlContainer = document.getElementById('account-wishlist-items');
    if (!wishlist.length) {
        wlContainer.innerHTML = '<p class="empty-state">Your wishlist is empty.</p>';
    } else {
        wlContainer.innerHTML = '';
        wishlist.forEach(p => {
            const item = document.createElement('div');
            item.className = 'wishlist-card';
            item.innerHTML = `
                <div class="wishlist-card-inner">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="wishlist-info">
                        <strong>${p.name}</strong>
                        <span class="wishlist-price">${formatPrice(p.price)}</span>
                    </div>
                    <button class="btn wishlist-add-btn" onclick="addToCart(allProducts.find(pr=>pr.id===${p.id}),1,this); showNotification('Added to cart!');">Add to Cart</button>
                </div>
            `;
            wlContainer.appendChild(item);
        });
    }
    document.getElementById('account-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
};
document.querySelector('.close-account')?.addEventListener('click', () => {
    document.getElementById('account-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});
document.getElementById('account-details-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('account-name').value.trim();
    const phone = document.getElementById('account-phone').value.trim();
    const address = document.getElementById('account-address').value.trim();
    const token = localStorage.getItem('clothify_token');
    if (!token) { showNotification('Please sign in again', 'fa-exclamation-circle', '#e74c3c'); return; }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Saving...';
    try {
        const res = await fetch(`${API_BASE}/user/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ name, phone, address })
        });
        const data = await res.json();
        if (res.ok) {
            currentUser = data.user;
            localStorage.setItem('clothify_user', JSON.stringify(currentUser));
            document.getElementById('account-welcome').textContent = currentUser.name;
            document.getElementById('account-email').textContent = currentUser.email;
            showNotification('Profile updated!', 'fa-circle-check', '#2ecc71');
        } else {
            showNotification(data.error || 'Failed to update', 'fa-exclamation-circle', '#e74c3c');
        }
    } catch {
        showNotification('Server unreachable', 'fa-exclamation-circle', '#e74c3c');
    }
    btn.disabled = false; btn.textContent = 'Save Changes';
});

// ─── Cart & Wishlist Server Sync ─────────────────────────────────

async function syncCartToServer() {
    const token = localStorage.getItem('clothify_token');
    if (!token || !currentUser) return;
    try {
        await fetch(`${API_BASE}/user/cart`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, image: i.image, quantity: i.quantity, size: i.size || '' })) })
        });
    } catch {}
}

async function syncWishlistToServer() {
    const token = localStorage.getItem('clothify_token');
    if (!token || !currentUser) return;
    try {
        await fetch(`${API_BASE}/user/wishlist`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ items: wishlist.map(i => ({ id: i.id, name: i.name, price: i.price, image: i.image })) })
        });
    } catch {}
}

async function syncCartFromServer() {
    const token = localStorage.getItem('clothify_token');
    if (!token) return;
    try {
        const res = await fetch(`${API_BASE}/user/cart`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
            const items = await res.json();
            if (items.length > 0) {
                cart = items.map(i => {
                    const p = allProducts.find(pr => pr.id === i.product_id) || { id: i.product_id, name: i.product_name, price: i.price, image: i.image, stock: 99 };
                    return { ...p, quantity: i.quantity, size: i.size };
                });
                localStorage.setItem('clothify_cart', JSON.stringify(cart));
                updateCartCount();
            }
        }
    } catch {}
}

async function syncWishlistFromServer() {
    const token = localStorage.getItem('clothify_token');
    if (!token) return;
    try {
        const res = await fetch(`${API_BASE}/user/wishlist`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
            const items = await res.json();
            if (items.length > 0) {
                wishlist = items.map(i => allProducts.find(p => p.id === i.product_id) || { id: i.product_id, name: i.product_name, price: i.price, image: i.image });
                localStorage.setItem('clothify_wishlist', JSON.stringify(wishlist));
            }
        }
    } catch {}
}

async function syncDataOnLogin() {
    const localCart = cart.length > 0;
    const localWishlist = wishlist.length > 0;
    await syncCartFromServer();
    await syncWishlistFromServer();
    if (localCart) await syncCartToServer();
    if (localWishlist) await syncWishlistToServer();
}

// ─── Password Change ────────────────────────────────────────────

document.getElementById('password-change-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('account-current-password').value;
    const newPassword = document.getElementById('account-new-password').value;
    const confirmPassword = document.getElementById('account-confirm-password').value;
    const errorEl = document.getElementById('passwordChangeError');
    errorEl.style.display = 'none';
    if (newPassword !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match';
        errorEl.style.display = 'block';
        return;
    }
    if (newPassword.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters';
        errorEl.style.display = 'block';
        return;
    }
    const token = localStorage.getItem('clothify_token');
    if (!token) { showNotification('Please sign in again', 'fa-exclamation-circle', '#e74c3c'); return; }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Updating...';
    try {
        const res = await fetch(`${API_BASE}/user/password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ currentPassword, newPassword })
        });
        const data = await res.json();
        if (res.ok) {
            showNotification('Password changed!', 'fa-circle-check', '#2ecc71');
            e.target.reset();
        } else {
            errorEl.textContent = data.error || 'Failed to change password';
            errorEl.style.display = 'block';
        }
    } catch {
        errorEl.textContent = 'Server unreachable';
        errorEl.style.display = 'block';
    }
    btn.disabled = false; btn.textContent = 'Update Password';
});

// ─── Email Change ────────────────────────────────────────────────

document.getElementById('email-change-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newEmail = document.getElementById('account-new-email').value.trim();
    const password = document.getElementById('account-email-password').value;
    const errorEl = document.getElementById('emailChangeError');
    errorEl.style.display = 'none';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        errorEl.textContent = 'Please enter a valid email address';
        errorEl.style.display = 'block';
        return;
    }
    const token = localStorage.getItem('clothify_token');
    if (!token) { showNotification('Please sign in again', 'fa-exclamation-circle', '#e74c3c'); return; }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending...';
    try {
        const res = await fetch(`${API_BASE}/user/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ newEmail, password })
        });
        const data = await res.json();
        if (res.ok) {
            document.getElementById('email-verify-step').style.display = 'block';
            document.getElementById('email-verify-step').dataset.email = newEmail;
            showNotification('Verification code sent!', 'fa-envelope', '#e67e22');
        } else {
            errorEl.textContent = data.error || 'Failed to send code';
            errorEl.style.display = 'block';
        }
    } catch {
        errorEl.textContent = 'Server unreachable';
        errorEl.style.display = 'block';
    }
    btn.disabled = false; btn.textContent = 'Send Verification Code';
});

window.confirmEmailChange = async function() {
    const code = document.getElementById('email-verify-code').value.trim();
    const errorEl = document.getElementById('emailVerifyError');
    errorEl.style.display = 'none';
    if (!/^\d{6}$/.test(code)) {
        errorEl.textContent = 'Please enter a valid 6-digit code';
        errorEl.style.display = 'block';
        return;
    }
    const token = localStorage.getItem('clothify_token');
    if (!token) { showNotification('Please sign in again', 'fa-exclamation-circle', '#e74c3c'); return; }
    const btn = document.getElementById('email-verify-btn');
    btn.disabled = true; btn.textContent = 'Verifying...';
    try {
        const res = await fetch(`${API_BASE}/user/email/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ code })
        });
        const data = await res.json();
        if (res.ok) {
            currentUser = data.user;
            localStorage.setItem('clothify_user', JSON.stringify(currentUser));
            document.getElementById('account-email').textContent = currentUser.email;
            document.getElementById('account-email-input').value = currentUser.email || '';
            document.getElementById('email-verify-step').style.display = 'none';
            document.getElementById('email-change-form').reset();
            showNotification('Email updated!', 'fa-circle-check', '#2ecc71');
        } else {
            errorEl.textContent = data.error || 'Invalid code';
            errorEl.style.display = 'block';
        }
    } catch {
        errorEl.textContent = 'Verification failed';
        errorEl.style.display = 'block';
    }
    btn.disabled = false; btn.textContent = 'Verify';
};

// ─── Address Management ─────────────────────────────────────────

async function loadAddresses() {
    const token = localStorage.getItem('clothify_token');
    const list = document.getElementById('addresses-list');
    if (!token) { list.innerHTML = '<p class="empty-state">Sign in to manage addresses.</p>'; return; }
    list.innerHTML = '<p class="empty-state">Loading...</p>';
    try {
        const res = await fetch(`${API_BASE}/user/addresses`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
            const addresses = await res.json();
            if (!addresses.length) {
                list.innerHTML = '<p class="empty-state">No saved addresses.</p>';
            } else {
                list.innerHTML = '';
                addresses.forEach(addr => {
                    const card = document.createElement('div');
                    card.className = 'address-card';
                    card.style.cssText = 'border:1px solid #eee;border-radius:8px;padding:12px;margin-bottom:8px;';
                    const isDefault = addr.is_default ? '<span style="background:#2ecc71;color:#fff;font-size:11px;padding:2px 8px;border-radius:10px;margin-left:8px;">Default</span>' : '';
                    card.innerHTML = `
                        <div style="display:flex;justify-content:space-between;align-items:start;">
                            <div>
                                <strong>${addr.label || 'Address'} ${isDefault}</strong>
                                <p style="margin:4px 0;font-size:13px;color:#555;">${addr.address}${addr.city ? ', ' + addr.city : ''}${addr.country ? ', ' + addr.country : ''}</p>
                                ${addr.phone ? `<p style="margin:0;font-size:12px;color:#888;">${addr.phone}</p>` : ''}
                            </div>
                            <div style="display:flex;gap:6px;">
                                ${!addr.is_default ? `<button class="btn" style="padding:4px 10px;font-size:12px;" onclick="setDefaultAddress(${addr.id})">Set Default</button>` : ''}
                                <button class="btn" style="padding:4px 10px;font-size:12px;background:#e74c3c;color:#fff;" onclick="deleteAddress(${addr.id})">Delete</button>
                            </div>
                        </div>
                    `;
                    list.appendChild(card);
                });
            }
        } else {
            list.innerHTML = '<p class="empty-state">Could not load addresses.</p>';
        }
    } catch {
        list.innerHTML = '<p class="empty-state">Could not load addresses.</p>';
    }
}

window.setDefaultAddress = async function(id) {
    const token = localStorage.getItem('clothify_token');
    if (!token) return;
    try {
        const res = await fetch(`${API_BASE}/user/addresses/${id}/default`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) { loadAddresses(); showNotification('Default address updated', 'fa-circle-check', '#2ecc71'); }
    } catch {}
};

window.deleteAddress = async function(id) {
    if (!confirm('Delete this address?')) return;
    const token = localStorage.getItem('clothify_token');
    if (!token) return;
    try {
        const res = await fetch(`${API_BASE}/user/addresses/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) { loadAddresses(); showNotification('Address deleted', 'fa-circle-check', '#2ecc71'); }
    } catch {}
};

document.getElementById('address-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const address = document.getElementById('addr-address').value.trim();
    const errorEl = document.getElementById('addressError');
    errorEl.style.display = 'none';
    if (!address) {
        errorEl.textContent = 'Address is required';
        errorEl.style.display = 'block';
        return;
    }
    const token = localStorage.getItem('clothify_token');
    if (!token) { showNotification('Please sign in again', 'fa-exclamation-circle', '#e74c3c'); return; }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Saving...';
    try {
        const res = await fetch(`${API_BASE}/user/addresses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                label: document.getElementById('addr-label').value || 'Home',
                address,
                city: document.getElementById('addr-city').value.trim(),
                country: document.getElementById('addr-country').value.trim(),
                zip: document.getElementById('addr-zip').value.trim(),
                phone: document.getElementById('addr-phone').value.trim(),
                is_default: document.getElementById('addr-default').checked
            })
        });
        const data = await res.json();
        if (res.ok) {
            loadAddresses();
            e.target.reset();
            document.getElementById('addr-label').value = 'Home';
            document.getElementById('addr-default').checked = true;
            showNotification('Address added!', 'fa-circle-check', '#2ecc71');
        } else {
            errorEl.textContent = data.error || 'Failed to add address';
            errorEl.style.display = 'block';
        }
    } catch {
        errorEl.textContent = 'Server unreachable';
        errorEl.style.display = 'block';
    }
    btn.disabled = false; btn.textContent = 'Add Address';
});

// Tab switch to addresses pane loads addresses
document.querySelectorAll('.account-nav-item').forEach(item => {
    item.addEventListener('click', () => {
        setTimeout(() => {
            if (item.dataset.tab === 'addresses') loadAddresses();
        }, 50);
    });
});

document.querySelectorAll('.account-nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.account-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        document.querySelectorAll('.account-pane').forEach(p => p.classList.remove('active'));
        document.getElementById('account-' + item.dataset.tab).classList.add('active');
    });
});
const logoutAccount = async () => {
    const token = localStorage.getItem('clothify_token');
    if (token) {
        try { await fetch(`${API_BASE}/logout`, { method:'POST', headers:{'Authorization':`Bearer ${token}`} }); } catch {}
    }
    currentUser = null;
    localStorage.removeItem('clothify_user');
    localStorage.removeItem('clothify_token');
    document.getElementById('account-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    showNotification('Logged out successfully');
};
async function requestAccountDeletion() {
  if (!confirm('Are you sure you want to delete your account? A verification code will be sent to your email.')) return;
  try {
    const res = await fetch(`${API_BASE}/request-account-deletion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email })
    });
    const data = await res.json();
    if (res.ok) {
      showNotification('Deletion code sent to your email!', 'fa-envelope', '#e67e22');
      document.getElementById('delete-account-step1').style.display = 'none';
      document.getElementById('delete-account-step2').style.display = 'block';
    } else {
      showNotification(data.error || 'Failed to send code', 'fa-exclamation-circle', '#e74c3c');
    }
  } catch {
    showNotification('Failed to send code', 'fa-exclamation-circle', '#e74c3c');
  }
}

async function confirmAccountDeletion() {
  const code = document.getElementById('deletion-code').value.trim();
  if (!code || code.length < 6) {
    showNotification('Please enter the full 6-digit code', 'fa-exclamation-circle', '#e74c3c');
    return;
  }
  if (!confirm('This action is permanent. Are you sure you want to delete your account?')) return;
  try {
    const res = await fetch(`${API_BASE}/confirm-account-deletion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email, code })
    });
    const data = await res.json();
    if (res.ok) {
      showNotification('Account deleted successfully', 'fa-circle-check', '#e74c3c');
      localStorage.removeItem('clothify_user');
      currentUser = null;
      document.getElementById('account-modal').style.display = 'none';
      document.body.style.overflow = 'auto';
      document.getElementById('delete-account-step2').style.display = 'none';
      document.getElementById('delete-account-step1').style.display = '';
      document.getElementById('deletion-code').value = '';
    } else {
      showNotification(data.error || 'Invalid code', 'fa-exclamation-circle', '#e74c3c');
    }
  } catch {
    showNotification('Failed to delete account', 'fa-exclamation-circle', '#e74c3c');
  }
}

window.openAccountDashboard = openAccountDashboard;
window.logoutAccount = logoutAccount;
window.requestAccountDeletion = requestAccountDeletion;
window.confirmAccountDeletion = confirmAccountDeletion;

// ---- AUTH MODAL ----
const authModal = document.getElementById('auth-modal');
const userBtn = document.getElementById('user-btn');
const closeAuth = document.querySelector('.close-auth');
const feedbackForm = document.getElementById('feedback-form');

window.switchAuthTab = (tab) => {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-pane').forEach(p => { p.classList.remove('active'); p.style.display = ''; });
    const tabEl = Array.from(document.querySelectorAll('.auth-tab')).find(t => t.textContent.toLowerCase().includes(tab) || t.getAttribute('onclick')?.includes(tab));
    if (tabEl) tabEl.classList.add('active');
    const pane = document.getElementById(`auth-${tab}`);
    if (pane) pane.classList.add('active');

    const titles = { feedback: ['Feedback', "We'd love to hear from you"], register: ['Create Account', 'Join us today!'], login: ['Welcome Back', 'Sign in to your account'], reset: ['Reset Password', "We'll send you a reset link"] };
    const [title, subtitle] = titles[tab] || ['', ''];
    const titleEl = document.getElementById('auth-title');
    const subEl = document.getElementById('auth-subtitle');
    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = subtitle;
};

const togglePassword = (inputId, btn) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.querySelector('i').className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
};

const openAuthModal = () => {
    switchAuthTab('feedback');
    authModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

userBtn.addEventListener('click', () => {
    if (currentUser) { openAccountDashboard(); }
    else { openAuthModal(); }
});
closeAuth.addEventListener('click', () => {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Feedback
feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('feedback-name').value;
    const email = document.getElementById('feedback-email').value;
    const message = document.getElementById('feedback-message').value;
    const btn = feedbackForm.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'Sending...';
    try { await fetch(`${API_BASE}/feedback`, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify({name,email,message}) }); }
    catch { const f = JSON.parse(localStorage.getItem('clothify_feedback') || '[]'); f.push({name,email,message,date:new Date().toISOString()}); localStorage.setItem('clothify_feedback', JSON.stringify(f)); }
    feedbackForm.innerHTML = `<div class="auth-header" style="padding:30px 0;"><div class="auth-icon" style="background:linear-gradient(135deg,#2ecc71,#27ae60);"><i class="fa-solid fa-check"></i></div><h2 style="font-size:20px;font-weight:700;color:#222;margin:0 0 4px;">Thank You!</h2><p style="font-size:13px;color:#999;margin:0;">We appreciate your feedback.</p></div><button class="btn auth-btn" onclick="document.getElementById('auth-modal').style.display='none';document.body.style.overflow='auto';"><i class="fa-regular fa-circle-check"></i> Close</button>`;
});

// Register
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const btn = document.querySelector('#register-form button');
    btn.disabled = true;
    btn.innerText = 'Creating...';
    try {
        const res = await fetch(`${API_BASE}/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password}) });
        if (res.ok) {
            const data = await res.json();
            if (data.verified === false) {
                document.getElementById('verify-email-text').textContent = `Enter the code sent to ${email}`;
                document.getElementById('auth-register').classList.remove('active');
                document.getElementById('auth-verify').style.display = 'block';
                document.getElementById('auth-verify').classList.add('active');
                document.getElementById('auth-title').textContent = 'Verify Email';
                document.getElementById('auth-subtitle').textContent = 'Check your inbox';
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                document.getElementById('verify-form').dataset.email = email;
                document.getElementById('verify-form').dataset.name = name;
                document.getElementById('verify-form').dataset.password = password;
                showNotification('Verification code sent!', 'fa-envelope', '#e67e22');
            } else {
                currentUser = data.user || { name, email };
                localStorage.setItem('clothify_user', JSON.stringify(currentUser));
                if (data.token) localStorage.setItem('clothify_token', data.token);
                syncDataOnLogin();
                showNotification('Account created!', 'fa-circle-check', '#2ecc71');
                document.getElementById('auth-modal').style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        } else {
            const err = await res.json();
            showNotification(err.error || 'Registration failed', 'fa-exclamation-circle', '#e74c3c');
            btn.disabled = false; btn.innerText = 'Create Account';
        }
    } catch {
        currentUser = { name, email };
        localStorage.setItem('clothify_user', JSON.stringify(currentUser));
        showNotification('Account created (offline)!', 'fa-circle-check', '#2ecc71');
        document.getElementById('auth-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const btn = document.querySelector('#login-form button');
    btn.disabled = true; btn.innerText = 'Signing in...';
    try {
        const res = await fetch(`${API_BASE}/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) });
        if (res.ok) {
            const data = await res.json();
            currentUser = data.user || { email, name: email.split('@')[0] };
            localStorage.setItem('clothify_user', JSON.stringify(currentUser));
            if (data.token) localStorage.setItem('clothify_token', data.token);
            syncDataOnLogin();
            showNotification('Welcome back!', 'fa-circle-check', '#2ecc71');
            document.getElementById('auth-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            const err = await res.json();
            if (res.status === 403 && !err.verified) {
                document.getElementById('verify-email-text').textContent = `Enter the code sent to ${email}`;
                document.getElementById('auth-login').classList.remove('active');
                document.getElementById('auth-verify').style.display = 'block';
                document.getElementById('auth-verify').classList.add('active');
                document.getElementById('auth-title').textContent = 'Verify Email';
                document.getElementById('auth-subtitle').textContent = 'Please verify before signing in';
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                document.getElementById('verify-form').dataset.email = email;
                document.getElementById('verify-form').dataset.name = email.split('@')[0];
                document.getElementById('verify-form').dataset.password = '';
                btn.disabled = false; btn.innerText = 'Sign In';
                showNotification('Please verify your email', 'fa-envelope', '#e67e22');
                return;
            }
            showNotification(err.message || 'Login failed', 'fa-exclamation-circle', '#e74c3c');
            btn.disabled = false; btn.innerText = 'Sign In';
        }
    } catch {
        currentUser = { email, name: email.split('@')[0] };
        localStorage.setItem('clothify_user', JSON.stringify(currentUser));
        showNotification('Logged in (offline)!', 'fa-circle-check', '#2ecc71');
        document.getElementById('auth-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Password Reset
document.getElementById('reset-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;
    showNotification(`Reset link sent to ${email}`, 'fa-envelope', '#2ecc71');
    document.getElementById('auth-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Verify Email
document.getElementById('verify-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('verify-code').value;
    const email = document.getElementById('verify-form').dataset.email;
    const name = document.getElementById('verify-form').dataset.name;
    const btn = document.querySelector('#verify-form button');
    btn.disabled = true; btn.innerText = 'Verifying...';
    try {
        const res = await fetch(`${API_BASE}/verify-email`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,code}) });
        if (res.ok) {
            const data = await res.json();
            currentUser = data.user || { name, email };
            localStorage.setItem('clothify_user', JSON.stringify(currentUser));
            if (data.token) localStorage.setItem('clothify_token', data.token);
            syncDataOnLogin();
            showNotification('Email verified!', 'fa-circle-check', '#2ecc71');
            document.getElementById('auth-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            const err = await res.json();
            showNotification(err.error || 'Invalid code', 'fa-exclamation-circle', '#e74c3c');
            btn.disabled = false; btn.innerText = 'Verify Email';
        }
    } catch {
        showNotification('Verification failed', 'fa-exclamation-circle', '#e74c3c');
        btn.disabled = false; btn.innerText = 'Verify Email';
    }
});

async function resendVerifyCode() {
    const email = document.getElementById('verify-form').dataset.email;
    if (!email) return;
    try {
        const res = await fetch(`${API_BASE}/resend-code`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email}) });
        if (res.ok) showNotification('Code resent!', 'fa-envelope', '#2ecc71');
        else showNotification('Failed to resend', 'fa-exclamation-circle', '#e74c3c');
    } catch {
        showNotification('Failed to resend', 'fa-exclamation-circle', '#e74c3c');
    }
}

// ---- NEWSLETTER ----
document.getElementById('subscribe-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('subscribe-email').value;
    const btn = document.querySelector('#subscribe-form button');
    btn.disabled = true; btn.innerText = 'Subscribing...';
    try { await fetch(`${API_BASE}/subscribe`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email}) }); } catch {}
    document.getElementById('subscribe-form').innerHTML = '<p style="color:#2ecc71;font-weight:500;text-align:center;">✓ Subscribed successfully!</p>';
});

// ---- MOBILE MENU ----
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger');
const toggleMenu = () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
};
hamburger.addEventListener('click', toggleMenu);
mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu && mobileMenu.classList.contains('active')) toggleMenu(); });
document.querySelectorAll('.mobile-nav-links a').forEach(link => link.addEventListener('click', () => { if (mobileMenu.classList.contains('active')) toggleMenu(); }));
document.getElementById('mobile-feedback-btn')?.addEventListener('click', (e) => { e.preventDefault(); toggleMenu(); openAuthModal(); });
document.getElementById('mobile-account-btn')?.addEventListener('click', (e) => { e.preventDefault(); toggleMenu(); openAccountDashboard(); });

// Mobile lang sync
const mobileLangSelect = document.getElementById('mobile-lang-select');
if (mobileLangSelect) mobileLangSelect.addEventListener('change', (e) => { switchLanguage(e.target.value); document.getElementById('lang-select').value = e.target.value; });

// ---- LANGUAGE ----
const switchLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('clothify_lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
    document.getElementById('lang-select').value = lang;
    updateCartUI();
    if (typeof fetchCategories === 'function') fetchCategories();
};
document.getElementById('lang-select').addEventListener('change', (e) => switchLanguage(e.target.value));

// ---- PAYMENT ----
document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.getElementById('card-details-form').style.display = e.target.value === 'Card' ? 'block' : 'none';
    });
});

// Card Brand Detection
const detectCardBrand = (number) => {
    const n = number.replace(/\s/g, '');
    if (/^4/.test(n)) return { name:'Visa', icon:'fa-brands fa-cc-visa', color:'#1a1f71' };
    if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return { name:'Mastercard', icon:'fa-brands fa-cc-mastercard', color:'#eb001b' };
    if (/^3[47]/.test(n)) return { name:'Amex', icon:'fa-brands fa-cc-amex', color:'#2e77bc' };
    if (/^6(?:011|5)/.test(n)) return { name:'Discover', icon:'fa-brands fa-cc-discover', color:'#ff6000' };
    return { name:'Card', icon:'fa-regular fa-credit-card', color:'#333' };
};
document.getElementById('card-number')?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) { if (i > 0 && i % 4 === 0) formatted += ' '; formatted += value[i]; }
    e.target.value = formatted;
    const brand = detectCardBrand(value);
    document.getElementById('card-brand-icon').className = brand.icon;
    document.getElementById('card-brand-name').textContent = brand.name;
    document.getElementById('card-brand-icon').style.color = brand.color;
    const msg = document.getElementById('card-number-msg');
    if (value.length > 0 && value.length < 13) { msg.textContent = 'Too short'; msg.className = 'card-validation-msg invalid'; }
    else if (value.length >= 13 && !luhnCheck(value)) { msg.textContent = 'Invalid card number (failed checksum)'; msg.className = 'card-validation-msg invalid'; }
    else if (value.length >= 13 && luhnCheck(value)) { msg.textContent = '✓ Valid'; msg.className = 'card-validation-msg valid'; }
    else { msg.textContent = ''; msg.className = 'card-validation-msg'; }
});
document.getElementById('card-expiry')?.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length >= 2) e.target.value = v.substring(0, 2) + '/' + v.substring(2, 4);
    else e.target.value = v;
    const msg = document.getElementById('card-expiry-msg');
    if (v.length === 4) { msg.textContent = '✓ Valid'; msg.className = 'card-validation-msg valid'; }
    else if (v.length > 0) { msg.textContent = 'Incomplete'; msg.className = 'card-validation-msg invalid'; }
    else { msg.textContent = ''; }
});
document.getElementById('card-cvv')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    const msg = document.getElementById('card-cvv-msg');
    if (e.target.value.length === 3 || e.target.value.length === 4) { msg.textContent = '✓ Valid'; msg.className = 'card-validation-msg valid'; }
    else if (e.target.value.length > 0) { msg.textContent = 'Incomplete'; msg.className = 'card-validation-msg invalid'; }
    else { msg.textContent = ''; }
});

// ─── Site Settings (Dynamic Content) ─────────────────────────────

let siteSettings = {};

async function loadSettings() {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to load settings');
    siteSettings = await res.json();
    applySettings(siteSettings);
  } catch (e) {
    console.warn('Could not load settings, using defaults');
  }
}

function applySettings(s) {
  if (!s || Object.keys(s).length === 0) return;

  const set = (sel, val) => { const el = typeof sel === 'string' ? document.querySelector(sel) : sel; if (el) el.textContent = val; };
  const setAttr = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };

  document.title = s.site_name ? `${s.site_name} | Modern Clothes Shop` : document.title;
  setAttr('meta[name="description"]', 'content', s.meta_description || '');
  setAttr('meta[name="keywords"]', 'content', s.meta_keywords || '');
  setAttr('meta[property="og:title"]', 'content', s.site_name ? `${s.site_name} | Modern Clothes Shop` : '');
  setAttr('meta[property="og:description"]', 'content', s.meta_description || '');
  setAttr('meta[property="og:image"]', 'content', s.og_image || '');

  if (s.favicon_svg) {
    let link = document.querySelector('link[rel="icon"]');
    if (link) link.href = `data:image/svg+xml,${encodeURIComponent(s.favicon_svg)}`;
  }

  if (s.site_logo_type === 'text') {
    document.querySelectorAll('.logo').forEach(el => el.textContent = s.site_logo_text || 'Clothify');
  } else if (s.site_logo_type === 'image' && s.site_logo_image) {
    document.querySelectorAll('.logo').forEach(el => {
      el.innerHTML = `<img src="${s.site_logo_image}" alt="${s.site_name || 'Logo'}" style="max-height:40px;">`;
    });
  }

  if (s.hero_title) set('[data-i18n="hero_title"]', s.hero_title);
  if (s.hero_subtitle) set('[data-i18n="hero_subtitle"]', s.hero_subtitle);
  if (s.hero_image) {
    const hero = document.getElementById('home');
    if (hero) hero.style.backgroundImage = `linear-gradient(135deg,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.25) 100%), url("${s.hero_image}")`;
  }

  if (s.about_title) set('[data-i18n="about_title"]', s.about_title);
  if (s.about_text_1) set('[data-i18n="about_p1"]', s.about_text_1);
  if (s.about_text_2) set('[data-i18n="about_p2"]', s.about_text_2);
  if (s.about_image) {
    const img = document.querySelector('.about-image img');
    if (img) { img.src = s.about_image; img.alt = `About ${s.site_name || 'Clothify'}`; }
  }
  if (s.about_stat_1_value) { const el = document.querySelector('.stat-item:nth-child(1) h3'); if (el) el.textContent = s.about_stat_1_value; }
  if (s.about_stat_1_label) set('[data-i18n="stat_customers"]', s.about_stat_1_label);
  if (s.about_stat_2_value) { const el = document.querySelector('.stat-item:nth-child(2) h3'); if (el) el.textContent = s.about_stat_2_value; }
  if (s.about_stat_2_label) set('[data-i18n="stat_designs"]', s.about_stat_2_label);
  if (s.about_stat_3_value) { const el = document.querySelector('.stat-item:nth-child(3) h3'); if (el) el.textContent = s.about_stat_3_value; }
  if (s.about_stat_3_label) set('[data-i18n="stat_sustainable"]', s.about_stat_3_label);

  if (s.footer_brand) { document.querySelectorAll('.footer-about h3, .footer-brand').forEach(el => el.textContent = s.footer_brand); }
  if (s.footer_about) set('[data-i18n="footer_about"]', s.footer_about);
  if (s.footer_facebook) setAttr('.footer-social-links a:nth-child(1)', 'href', s.footer_facebook);
  if (s.footer_instagram) setAttr('.footer-social-links a:nth-child(2)', 'href', s.footer_instagram);
  if (s.footer_twitter) setAttr('.footer-social-links a:nth-child(3)', 'href', s.footer_twitter);
  if (s.footer_pinterest) setAttr('.footer-social-links a:nth-child(4)', 'href', s.footer_pinterest);
  if (s.footer_youtube) setAttr('.footer-social-links a:nth-child(5)', 'href', s.footer_youtube);

  if (s.newsletter_title) set('[data-i18n="newsletter_title"]', s.newsletter_title);
  if (s.newsletter_description) set('.newsletter-desc', s.newsletter_description);

  if (s.cookie_consent_text) {
    const p = document.querySelector('#cookie-consent p');
    if (p) p.innerHTML = s.cookie_consent_text.replace(/\n/g, '<br>');
  }

  if (s.copyright_text) {
    const el = document.querySelector('.copyright');
    if (el) el.innerHTML = s.copyright_text;
  }

  if (s.primary_color || s.accent_color) {
    const root = document.documentElement;
    if (s.primary_color) root.style.setProperty('--primary-color', s.primary_color);
    if (s.accent_color) root.style.setProperty('--accent-color', s.accent_color);
  }

  if (s.ga_id && s.ga_id !== 'G-XXXXXXXXXX') {
    const existing = document.querySelector('script[src*="googletagmanager"]');
    if (existing) existing.src = `https://www.googletagmanager.com/gtag/js?id=${s.ga_id}`;
  }

  if (s.google_client_id) {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.dataset.googleClientId = s.google_client_id;
  }
}

// ---- GOOGLE SIGN-IN ----
function handleGoogleCredential(response) {
    fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
    })
    .then(r => r.json())
    .then(data => {
        if (data.user) {
            currentUser = data.user;
            localStorage.setItem('clothify_user', JSON.stringify(currentUser));
            showNotification('Google sign-in successful!', 'fa-circle-check', '#2ecc71');
            document.getElementById('auth-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            showNotification('Google sign-in failed', 'fa-exclamation-circle', '#e74c3c');
        }
    })
    .catch(() => showNotification('Google sign-in failed', 'fa-exclamation-circle', '#e74c3c'));
}

function signInWithGoogle() {
    const clientId = document.getElementById('auth-modal')?.dataset?.googleClientId;
    if (!clientId) {
        showNotification('Google sign-in coming soon', 'fa-brands fa-google', '#4285f4');
        return;
    }
    google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredential
    });
    google.accounts.id.prompt();
}

// ---- INIT ----
loadSettings();
loadProducts();
fetchCategories();
switchLanguage(currentLang);
updateCompareUI();
renderRecentlyViewed();
checkAbandonedCart();
trackPageView('home');

// Track product views
document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card && !e.target.closest('.add-to-cart') && !e.target.closest('.wishlist-btn')) {
        const name = card.querySelector('h3')?.textContent || 'unknown';
        const product = allProducts.find(p => p.name === name);
        if (product) trackPageView('product_view', product.id);
    }
});

// Auto-login check
const storedUser = localStorage.getItem('clothify_user');
if (storedUser) { try { currentUser = JSON.parse(storedUser); } catch {} }
