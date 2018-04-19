var addresses = []
var id = 0
var show = document.getElementById('show');
var form = document.getElementById('form');
var add = document.getElementById('add');
var details = document.getElementById('details');
var autocomplete = document.getElementById('autocomplete');
// form inputs


showList = () => {
    show.innerHTML = '';
    for (const address of addresses) {
        var str = `<div class='list' id=${address.id}><strong>${address.name}</strong>click to view contact details`
        str += `<div><button class='btn btn-primary edit' id=${address.id}>Edit</button>`;
        str += `<button class='delete btn btn-danger' id='${address.id}'>Delete</button></div>`
        str += `</div>`
        show.innerHTML += str;
    }
    form.style.display = 'none';
    show.style.display = 'flex';
    add.style.display = 'flex';
}

hideList = () => {
    form.style.display = 'flex';
    show.style.display = 'none';
    add.style.display = 'none';
    details.style.display = 'none';
}

var submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var formId = document.getElementById('id').value;
    var addressId = id += 1

    if (formId) {
        addresses = addresses.filter(address => address.id !== parseInt(formId))
        addressId = parseInt(formId)
    }

    addresses.push({ name, email, phone, address, id: addressId })
    clearForm()
    showList()
    document.getElementById('autocomplete').style.display = 'block';
})

clearForm = () => {
    var inputs = document.getElementsByClassName('input');
    for (const input of inputs) input.value = ''
}

add.addEventListener('click', () => {
    hideList()
    document.getElementById('close').style.display = 'block';
    document.getElementById('autocomplete').style.display = 'none';
})

var close = document.getElementById('close');
close.addEventListener('click', () => {
    showList()
    document.getElementById('autocomplete').style.display = 'block';
})


showDetails = (obj) => {

    showList()
    if (obj === undefined) return null

    document.getElementById(`${obj.id}`).innerHTML = '';

    var str2 = `<div id=''>`
    str2 += `<p> <strong>Name: </strong>${obj.name}</p>`
    str2 += `<p> <strong>Email: </strong>${obj.email}</p>`
    str2 += `<p> <strong>Phone: </strong>${obj.phone} </p>`
    str2 += `<p> <strong>Address: </strong>${obj.address}</p>`
    str2 += `<div class='detailsButton'>`
    str2 += `<button class='btn btn-primary edit' id='${obj.id}'>Edit</button>`
    str2 += `<button class='delete btn btn-danger' id='${obj.id}'>Delete</button>`
    str2 += `<button id='back' class='back btn btn-default'>Back</button>`
    str2 += `</div>`
    str2 += `</div>`
    document.getElementById(`${obj.id}`).innerHTML += str2;
    document.getElementById(`${obj.id}`).style.display = 'flex';
}

show.addEventListener('click', (e) => {
    if (e.target.id && e.target.classList.contains('list')) {
        var id = parseInt(e.target.id)
        let addrs = addresses.filter(address => address.id === id)

        showDetails(addrs[0])
        show.style.display = 'flex';
    }
}, false);


show.addEventListener('click', (e) => {
    if (e.target.id && e.target.classList.contains('edit')) {
        var id = parseInt(e.target.id)
        let addrs = addresses.filter(address => address.id === id)[0]
        hideList()
        var inputs = document.getElementsByClassName('input');
        for (const input of inputs) input.value = addrs[input.name]
    }
})


show.addEventListener('click', (e) => {
    if (e.target.id && e.target.classList.contains('delete')) {
        var id = parseInt(e.target.id)
        if (confirm('Are you sure you want to delete this contact?')) {
            addresses = addresses.filter(address => address.id !== id)
            showList()
        }
    }
})


show.addEventListener('click', (e) => {
    if (e.target.classList.contains('back')) {
        showList()
    }
})

renderShow = (addressesArray) => {
    show.innerHTML = '';

    for (const address of addressesArray) {
        var str3 = `<div class='list' id=${address.id}><strong>${address.name}</strong>click to view contact details`
        str3 += `<div><button class='btn btn-primary edit' id=${address.id}>Edit</button>`;
        str3 += `<button class='delete btn btn-danger' id='${address.id}'>Delete</button></div>`
        str3 += `</div>`
        show.innerHTML += str3;
    }
}

autocomplete.addEventListener('keyup', () => {
    let searchContent = autocomplete.value.toLowerCase()
    let searchAddresses = addresses.filter(address => {
        return (
            address.name.toLowerCase().includes(searchContent) ||
            address.phone.toLowerCase().includes(searchContent) ||
            address.email.toLowerCase().includes(searchContent) ||
            address.address.toLowerCase().includes(searchContent)
        )
    })
    renderShow(searchAddresses)
});