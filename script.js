let addresses = []
let id = 0

$(function() {
    $('#show').hide()
})


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

showList = () => {
    $('#show').html('')
    for (const address of addresses) {
        $('#show').append(
            `<div class='list' id='${address.id}'><strong>${address.name}</strong>
      <div>
      <button class='btn btn-primary edit' id='${address.id}' >Edit</button>
      <button class='delete btn btn-danger' id='${address.id}'>Delete</button> 
      </div>
      </div>`
        )
    }
    $('#form').hide()
    $('#show').show()
    $('#add').show()
}

hideList = () => {
    $('#form').show()
    $('#show').hide()
    $('#add').hide()
    $('#details').hide()
}

$('#submit').click(() => {
    var name = $('#name').val()
    var email = $('#email').val()
    var phone = $('#phone').val()
    var address = $('#address').val()
    let formId = $('#id').val()
    let image = $('#image').val()
    let addressId = id += 1

    var file = $('#image').toString()

    console.log(file)
    if (formId) {
        addresses = addresses.filter(address => address.id !== parseInt(formId))
        addressId = parseInt(formId)
    }

    addresses.push({ name, email, phone, address, id: addressId, image })
    clearForm()
    showList()
})

clearForm = () => {
    var inputs = $('.input')
    for (const input of inputs) input.value = ''
}

$('#add').click(() => { hideList() })

$('#close').click(() => { showList() })

showDetails = (obj) => {
    showList()

    if (obj === undefined) return null

    $('#' + obj.id).html('')
    $('#' + obj.id).append(
        `<div class='show'>
    <img id="blah" src="#" alt="your image" />
    <p> <strong>Name: </strong>${obj.name}</p>
    <p> <strong>Email: </strong>${obj.email}</p>
    <p> <strong>Phone: </strong>${obj.phone} </p>
    <p> <strong>Address: </strong>${obj.address}</p>
    <div>
    <button class='btn btn-primary edit' id='${obj.id}'>Edit</button> 
    <button class='delete btn btn-danger' id='${obj.id}'>Delete</button>
    <button id='back' class='btn btn-default'>Back</button>
    </div>
    </div>`
    )
    $('#' + obj.id).show()
}

$('#show').on('click', $('.list'), (event) => {
    if (event.target.id && event.target.className === 'list') {
        var id = parseInt(event.target.id)
        let addrs = addresses.filter(address => address.id === id)

        showDetails(addrs[0])
        $('#show').show()
        readURL(this)
    }
})

$('#show').on('click', $('.edit'), (event) => {
    if (event.target.id && event.target.className.split(' ').includes('edit')) {
        var id = parseInt(event.target.id)
        let addrs = addresses.filter(address => address.id === id)[0]

        hideList()

        let inputs = $('.input')
        for (let input of inputs) input.value = addrs[input.name]
    }
})

$('#show').on('click', $('.delete'), (event) => {
    if (event.target.id && event.target.className.split(' ').includes('delete')) {
        var id = parseInt(event.target.id)
        if (confirm('Are you sure you want to delete this contact?')) {
            addresses = addresses.filter(address => address.id !== id)
            showList()
        }
    }
})

$('#show').on('click', $('.back'), (event) => {
    event.target.id === 'back' && showList()
})