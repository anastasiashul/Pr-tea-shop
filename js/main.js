let cart=[];

function renderCart(){
    let cartContainer=document.getElementById('cart-items');
    let totalElement=document.getElementById('cart-total');
    if(cart.length==0){
        cartContainer.innerHTML='Корзина пуста';
        totalElement.textContent='Итого: 0 р';
        return;
    }
    cartContainer.innerHTML='';
    let total=calculateTotal();

    cart.forEach((item, index) => {
        let cartElement= document.createElement('div');
        cartElement.className='cart-item';
        cartElement.innerHTML=`
        <p>${item.name}</p>
        <p>Цена: ${item.price} р</p>
        <button class="remove-btn" data-index="${index}">Удалить</button>
        `;
        cartContainer.appendChild(cartElement);

    });
    totalElement.textContent=`Итого: ${total} р`;
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = Number(btn.dataset.index);
            cart.splice(index, 1);
            renderCart();
        });
    });
}
const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {total+=item.price;})
    return total;
}


const clearCart = () => {
    if (cart.length == 0) {
        alert('Корзина уже пуста');
        return;
    }
    cart = [];
    renderCart();
    alert('Корзина очищена');
};
function checkout(){
    if (cart.length==0){
        alert('Корзина пуста');
        return;
    }
    alert('Покупка прошла успешно!');
    cart=[];
    renderCart();
}


const filter = () => {
    let selectedCategory = document.getElementById('category-filter').value;
    let products = document.querySelectorAll('.product');
    products.forEach(product => display_product(product, selectedCategory));  
}

const display_product = (product, cat) => {
    let category = product.dataset.category; 
    if (cat=='all' || category==cat){
        product.style.display='block';
    }
    else {
        product.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let filterSelect=document.getElementById('category-filter');
    if(filterSelect){
        filterSelect.addEventListener('change', filter);
    }

    const addButtons=document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', ()=>dataforcart(btn))
    })

    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) clearBtn.addEventListener('click', clearCart);

    const checkoutbtn= document.getElementById('checkout');
    if (checkoutbtn) checkoutbtn.addEventListener('click', checkout);

    renderCart();
})

function dataforcart(btn){
    let product=btn.closest('.product');
    let name=product.dataset.name;
    let price=Number(product.dataset.price);
    addToCart(name, price);
}
const addToCart = function(name, price) {
    cart.push({ name, price });
    renderCart();
};