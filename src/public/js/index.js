
const delForm = document.getElementById('deleteProd')

delForm.addEventListener('submit', async(e)=> {
    e.preventDefault()

    let prodId = document.getElementById('delProdId').value;
    let actionUrl = `/api/products/${prodId}`;
    // delForm.action = `/api/products/${prodId}`
    let result = await fetch(actionUrl, {
        method: 'DELETE'
    })
    let json = await result.json()
    console.log(json)
    // delForm.submit();
});


const updateForm = document.getElementById('updateProd')

updateForm.addEventListener('submit', async(e)=> {
    e.preventDefault()

    let prodId = document.getElementById('uId').value;
    let actionUrl = `/api/products/${prodId}`;
    
    let updatedProduct = {
        title: document.getElementById('uTitle').value,
        description: document.getElementById('uDescription').value,
        code: document.getElementById('uCode').value,
        price: document.getElementById('uPrice').value,
        status: document.getElementById('uStatus').value,
        stock: document.getElementById('uStock').value,
        category: document.getElementById('uCategory').value,
        thumbnail: document.getElementById('uThumbnail').value,
        _id: prodId
    };
    
    try {
        let result = await fetch(actionUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        
        let json = await result.json();
        console.log(json);
    } catch (error) {
        console.error('Error:', error);
    }
});

// const addProdToCart = document.getElementById('addProdToCart')

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.addProdToCart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const cid = "65f6e85d9ee742a71efd9ff9"
            const pid = button.dataset.pid;

            try {
                const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            console.log(`ok`)
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message); // Log success message
                } else {
                    throw new Error('Failed to add product to cart');
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        });
    });
});