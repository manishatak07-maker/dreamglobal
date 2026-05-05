// SANTRA MALL DATABASE - NETLIFY SAFE VERSION
var DB = {
    products: [],
    categories: [
        {id:1, name:"Fashion", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100"},
        {id:2, name:"Electronics", img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100"},
        {id:3, name:"Home", img:"https://images.unsplash.com/photo-1511920170033-f8396924c348?w=100"},
        {id:4, name:"Beauty", img:"https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100"}
    ],
    users: [
        {id:1, name:"Manisha Tak", email:"manishatak07@gmail.com", pass:"admin123", role:"admin", mobile:"9001654667", mobileVerified: true}
    ],
    orders: [], cart: [], otps: [], enquiries: [], searchHistory: [], customerForms: [],
    settings: {
        siteName: "SANTRA SHOPPING MALL", logo: "🛍️ SANTRA MALL", primaryColor: "#e40046",
        bgColor: "#f1f3f6", textColor: "#212121", fontFamily: "Arial, sans-serif",
        fontSize: "16px", bgImage: "", delivery: 49, freeDeliveryAbove: 499, paytmQR: "",
        requiredFields: { checkout: ["name", "mobile", "address", "city", "pin"], signup: ["email", "pass", "mobile"] }
    }
};

const saved = localStorage.getItem('SANTRA_DB');
if(saved) {
    const oldDB = JSON.parse(saved);
    DB = {...DB, ...oldDB};
    if(!DB.categories || DB.categories.length === 0) {
        DB.categories = [
            {id:1, name:"Fashion", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100"},
            {id:2, name:"Electronics", img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100"},
            {id:3, name:"Home", img:"https://images.unsplash.com/photo-1511920170033-f8396924c348?w=100"},
            {id:4, name:"Beauty", img:"https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100"}
        ];
    }
    DB.settings = {...DB.settings, ...oldDB.settings};
    if(!DB.otps) DB.otps = [];
    if(!DB.enquiries) DB.enquiries = [];
    if(!DB.searchHistory) DB.searchHistory = [];
    if(!DB.customerForms) DB.customerForms = [];
    if(!DB.settings.requiredFields) DB.settings.requiredFields = {checkout: ["name", "mobile", "address", "city", "pin"], signup: ["email", "pass", "mobile"]};
    DB.users.forEach(u => { if(u.mobileVerified === undefined) u.mobileVerified = false; });
}

if(!DB.users.find(u=>u.email==="manishatak07@gmail.com")){
    DB.users.push({id:1,name:"Manisha Tak",email:"manishatak07@gmail.com",pass:"admin123",role:"admin",mobile:"9001654667",mobileVerified:true,profilePic:"",securityQuestion:"Tera pehla school?",securityAnswer:"santra"});
}

function saveDB(){ localStorage.setItem('SANTRA_DB', JSON.stringify(DB)); }
function generateOTP(){ return Math.floor(100000 + Math.random() * 900000).toString(); }
function sendOTP(type, value, otp){
    if(type==='mobile'){ alert(`📱 Mobile OTP for ${value}: ${otp}\n\nNote: Real SMS ke liye backend chahiye. Abhi ye demo hai.`); }
    else{ alert(`📧 Email OTP for ${value}: ${otp}\n\nNote: Real Email ke liye backend chahiye. Abhi ye demo hai.`); }
    console.log(`OTP for ${type} ${value}: ${otp}`);
    DB.otps.push({ type: type, value: value, otp: otp, time: Date.now(), used: false });
    saveDB();
}
function verifyOTP(type, value, userOTP){
    DB.otps = DB.otps.filter(o => Date.now() - o.time < 5*60*1000);
    const found = DB.otps.find(o => o.type === type && o.value === value && o.otp === userOTP && !o.used);
    if(found){ found.used = true; saveDB(); return true; }
    return false;
}
function trackSearch(uid, keyword){
    if(!uid || !keyword || keyword.length < 2) return;
    DB.searchHistory.push({uid: uid, keyword: keyword, time: Date.now()});
    if(DB.searchHistory.length > 1000) DB.searchHistory.shift();
    saveDB();
}
function saveCustomerForm(uid, formType, data){
    DB.customerForms.push({ uid: uid, formType: formType, data: data, time: Date.now() });
    saveDB();
}
saveDB();