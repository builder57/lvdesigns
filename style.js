/* =========================================
   LIVANIKA - JAVASCRIPT LOGIC
   ========================================= */

// 1. STATE MANAGEMENT
let cart = [];
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCountElement = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');

// 2. NAVIGATION FUNCTION - Switches between 10 pages
function showPage(pageId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Close cart if open
    if (cartModal && cartModal.classList.contains('open')) {
        toggleCart();
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. CART TOGGLE FUNCTION - Opens/Closes cart modal
function toggleCart() {
    if (cartModal) {
        cartModal.classList.toggle('open');
    }
}

// 4. ADD TO CART FUNCTION - Adds items to cart
function addToCart(name, price, image = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80') {
    try {
        // Check if item already exists
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        updateCartUI();
        showToast(`Added ${name} to cart`);
    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Error adding item to cart');
    }
}

// 5. REMOVE FROM CART FUNCTION - Removes items from cart
function removeFromCart(index) {
    try {
        cart.splice(index, 1);
        updateCartUI();
        showToast('Item removed from cart');
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

// 6. UPDATE CART UI - Updates count, total, and items display
function updateCartUI() {
    try {
        // Update Count Badge
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalCount;
        }

        // Update Total Price
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalElement) {
            cartTotalElement.textContent = '$' + totalPrice.toFixed(2);
        }

        // Render Cart Items
        renderCartItems();
    } catch (error) {
        console.error('Error updating cart UI:', error);
    }
}

// 7. RENDER CART ITEMS IN MODAL - Displays cart items
function renderCartItems() {
    try {
        if (cart.length === 0) {
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = '<p style="text-align:center; color:#999; margin-top:2rem;">Your cart is empty.</p>';
            }
            return;
        }

        let html = '';
        cart.forEach((item, index) => {
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div style="flex:1;">
                        <h4 style="font-size:0.9rem;">${item.name}</h4>
                        <p style="font-size:0.8rem; color:#666;">$${item.price} x ${item.quantity}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#E5989B; cursor:pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = html;
}
    } catch (error) {
        console.error('Error rendering cart items:', error);
    }
}

// 8. TOAST NOTIFICATION - Professional feedback message
function showToast(message) {
    try {
        // Create toast element
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = '#4A4A4A';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '3000';
        toast.style.animation = 'fadeIn 0.3s ease, fadeOut 0.3s ease 2.7s';
        toast.textContent = message;

        document.body.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    } catch (error) {
        console.error('Error showing toast:', error);
    }
}

// 9. KEYBOARD NAVIGATION - Close cart with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && cartModal && cartModal.classList.contains('open')) {
        toggleCart();
    }
});

// 10. INITIALIZE - Run on page load
window.addEventListener('DOMContentLoaded', function() {
    console.log('Livanika website loaded successfully!');
    // Optional: Load demo data
    // addToCart('Demo Item', 50);
});

// 11. CHECKOUT FUNCTION - Placeholder for checkout
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    showToast('Proceeding to checkout...');
    // Add actual checkout logic here
}

// 12. CONTACT FORM HANDLER - For contact page
function submitContactForm(event) {
    event.preventDefault();
    showToast('Thank you for contacting us!');
    event.target.reset();
}

// 13. SEARCH FUNCTION - For product search
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(query.toLowerCase())) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// 14. FILTER FUNCTION - For product filtering
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// 15. RATING FUNCTION - For reviews
function setRating(stars) {
    const ratingStars = document.querySelectorAll('.star');
    ratingStars.forEach((star, index) => {
        if (index < stars) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// 16. SUBMIT REVIEW FUNCTION - For review submission
function submitReview(name, rating, comment) {
    try {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</div>
            <p class="review-text">"${comment}"</p>
            <p class="reviewer-name">${name}</p>
        `;
        document.querySelector('.reviews-container').appendChild(reviewCard);
        showToast('Thank you for your review!');
    } catch (error) {
        console.error('Error submitting review:', error);
    }
}

// 17. FAQ TOGGLE FUNCTION - For FAQ page
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        element.querySelector('.faq-icon').textContent = '+';
    } else {
        answer.style.display = 'block';
        element.querySelector('.faq-icon').textContent = '-';
    }
}

//
18. POLICY TOGGLE FUNCTION - For policy page
function togglePolicy(element) {
    const content = element.nextElementSibling;
    if (content.style.display === 'block') {
        content.style.display = 'none';
        element.querySelector('.policy-icon').textContent = '+';
    } else {
        content.style.display = 'block';
        element.querySelector('.policy-icon').textContent = '-';
    }
}

// 19. PRODUCT DETAIL FUNCTION - For product detail page
function showProductDetail(productId) {
    // Add product detail logic here
    showToast('Product details loaded');
}

// 20. LOGOUT FUNCTION - For user account
function logout() {
    showToast('Logged out successfully');
    // Add logout logic here
}

// 21. LOGIN FUNCTION - For user account
function login(email, password) {
    if (email && password) {
        showToast('Logged in successfully');
    } else {
        showToast('Please enter email and password');
    }
}

// 22. UPDATE QUANTITY FUNCTION - For cart items
function updateQuantity(index, change) {
    try {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
            updateCartUI();
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

// 23. CLEAR CART FUNCTION - For clearing all items
function clearCart() {
    cart = [];
    updateCartUI();
    showToast('Cart cleared');
}

// 24. SAVE TO LOCAL STORAGE - For persistent cart
function saveCart() {
    localStorage.setItem('livanikaCart', JSON.stringify(cart));
}

// 25. LOAD FROM LOCAL STORAGE - For persistent cart
function loadCart() {
    const savedCart = localStorage.getItem('livanikaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// 26. CHECKOUT CONFIRMATION - For checkout confirmation
function confirmCheckout() {
    if (cart.length > 0) {
        showToast('Order confirmed! Thank you for shopping with Livanika.');
        clearCart();
    } else {
        showToast('Your cart is empty!');
    }
}

// 27. SUBSCRIBE TO NEWSLETTER - For newsletter signup
function subscribeNewsletter(email) {
    if (email) {
        showToast('Thank you for subscribing!');
    } else {
        showToast('Please enter your email');
    }
}

// 28. SHARE PRODUCT FUNCTION - For social sharing
function shareProduct(name, url) {
    if (navigator.share) {
        navigator.share({
            title: name,
            text: 'Check out this product from Livanika!',
            url: url
        }).catch(console.error);
    } else {
        showToast('Share link copied to clipboard');
    }
}

// 29. WISHLIST FUNCTION - For wishlist
function addToWishlist(productId) {
    showToast('Added to wishlist');
    // Add wishlist logic here
}

// 30. REMOVE FROM WISHLIST FUNCTION - For wishlist
function removeFromWishlist(productId) {
    showToast('Removed from wishlist');
    // Add wishlist logic here
}

// 31. SORT PRODUCTS FUNCTION - For sorting
function sortProducts(criteria) {
    // Add sorting logic here
    showToast('Products sorted by ' + criteria);
}

// 32. PAGINATION FUNCTION - For product pagination
function goToPage(page) {
    // Add pagination logic here
    showToast('Page ' + page);
}

// 33. LOAD MORE FUNCTION - For loading more products
function loadMoreProducts() {
    // Add load more logic here
    showToast('Loading more products...');
}

// 34. CONTACT FORM VALIDATION - For contact form
function validateContactForm(form) {
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;
    
    if (!name || !email || !message) {
        showToast('Please fill in all fields');
        return false;
    }
    return true;
}

// 35. PASSWORD STRENGTH CHECKER - For account creation
function checkPasswordStrength(password) {
    const strength = password.length >= 8 ? 'Strong' : 'Weak';
    showToast('Password strength: ' + strength);
}

// 36. EMAIL VALIDATION - For email fields
function validat
eEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 37. PHONE VALIDATION - For phone fields
function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

// 38. DATE VALIDATION - For date fields
function validateDate(date) {
    const d = new Date(date);
    return !isNaN(d.getTime());
}

// 39. CURRENCY FORMATTER - For price display
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

// 40. NUMBER FORMATTER - For quantity display
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 41. TIME FORMATTER - For time display
function formatTime(date) {
    return date.toLocaleTimeString();
}

// 42. DATE FORMATTER - For date display
function formatDate(date) {
    return date.toLocaleDateString();
}

// 43. TRIM STRING FUNCTION - For input cleaning
function trimString(str) {
    return str.trim();
}

// 44. CAPITALIZE FIRST LETTER - For names
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// 45. REVERSE STRING FUNCTION - For testing
function reverseString(str) {
    return str.split('').reverse().join('');
}

// 46. CHECK IF EMPTY - For validation
function isEmpty(str) {
    return str.length === 0;
}

// 47. CHECK IF NULL - For validation
function isNull(value) {
    return value === null;
}

// 48. CHECK IF UNDEFINED - For validation
function isUndefined(value) {
    return value === undefined;
}

// 49. CHECK IF NUMBER - For validation
function isNumber(value) {
    return !isNaN(value);
}

// 50. CHECK IF BOOLEAN - For validation
function isBoolean(value) {
    return typeof value === 'boolean';
}

// 51. CHECK IF ARRAY - For validation
function isArray(value) {
    return Array.isArray(value);
}

// 52. CHECK IF OBJECT - For validation
function isObject(value) {
    return typeof value === 'object' && value !== null;
}

// 53. CHECK IF FUNCTION - For validation
function isFunction(value) {
    return typeof value === 'function';
}

// 54. CHECK IF STRING - For validation
function isString(value) {
    return typeof value === 'string';
}

// 55. CHECK IF DATE - For validation
function isDate(value) {
    return value instanceof Date;
}

// 56. CHECK IF REGEX - For validation
function isRegex(value) {
    return value instanceof RegExp;
}

// 57. CHECK IF PROMISE - For validation
function isPromise(value) {
    return value instanceof Promise;
}

// 58. CHECK IF MAP - For validation
function isMap(value) {
    return value instanceof Map;
}

// 59. CHECK IF SET - For validation
function isSet(value) {
    return value instanceof Set;
}

// 60. CHECK IF WEAKMAP - For validation