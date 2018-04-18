'use strict';

var addresses = [];
var id = 0;

$(function() {
    $('#show').hide();
    $('#autocomplete').hide();
});

function showList() {
    $('#show').html('');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = addresses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var address = _step.value;

            $('#show').append('<div class=\'list\' id=\'' + address.id + '\'><strong>' + address.name + '</strong>\n          click to view contact details\n      <div>\n      <button class=\'btn btn-primary edit\' id=\'' + address.id + '\' >Edit</button>\n      <button class=\'delete btn btn-danger\' id=\'' + address.id + '\'>Delete</button>\n      </div>\n      </div>');
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    $('#form').hide();
    $('#show').show();
    $('#add').show();
};

function hideList() {
    $('#form').show();
    $('#show').hide();
    $('#add').hide();
    $('#details').hide();
};

$('#submit').click(function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var address = $('#address').val();
    var formId = $('#id').val();
    var addressId = id += 1;
    var filesSelected = $("#image")[0].files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(filesSelected);

    fileReader.onloadend = function() {
        if (formId) {
            addresses = addresses.filter(function(address) {
                return address.id !== parseInt(formId);
            });
            addressId = parseInt(formId);
        }

        addresses.push({ name: name, email: email, phone: phone, address: address, id: addressId, image: fileReader.result });
        clearForm();
        showList();
    };
    $('#autocomplete').show();
});

function clearForm() {
    var inputs = $('.input');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = inputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var input = _step2.value;
            input.value = '';
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
};

$('#add').click(function() {
    hideList();
    $('#autocomplete').hide();
});

$('#close').click(function() {
    showList();
    $('#autocomplete').show();
});

function showDetails(obj) {
    showList();

    if (obj === undefined) return null;

    $('#' + obj.id).html('');
    $('#' + obj.id).append('<div id=\'\'>\n    <img id=\'img' + obj.id + '\' src=\'#\' class=\'image\'/>\n    <p> <strong>Name: </strong>' + obj.name + '</p>\n    <p> <strong>Email: </strong>' + obj.email + '</p>\n    <p> <strong>Phone: </strong>' + obj.phone + ' </p>\n    <p> <strong>Address: </strong>' + obj.address + '</p>\n    <div class=\'detailsButton\'>\n    <button class=\'btn btn-primary edit\' id=\'' + obj.id + '\'>Edit</button>\n    <button class=\'delete btn btn-danger\' id=\'' + obj.id + '\'>Delete</button>\n    <button id=\'back\' class=\'btn btn-default\'>Back</button>\n    </div>\n    </div>');
    $('#img' + obj.id).attr('src', obj.image);
    $('#' + obj.id).show();
};

$('#show').on('click', $('.list'), function(event) {
    if (event.target.id && event.target.className === 'list') {
        var id = parseInt(event.target.id);
        var addrs = addresses.filter(function(address) {
            return address.id === id;
        });

        showDetails(addrs[0]);
        $('#show').show();
    }
});

$('#show').on('click', $('.edit'), function(event) {
    if (event.target.id && event.target.className.includes('edit')) {
        var id = parseInt(event.target.id);
        var addrs = addresses.filter(function(address) {
            return address.id === id;
        })[0];

        hideList();

        var inputs = $('.input');
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = inputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var input = _step3.value;
                input.value = addrs[input.name];
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }
});

$('#show').on('click', $('.delete'), function(event) {
    if (event.target.id && event.target.className.includes('delete')) {
        var id = parseInt(event.target.id);
        if (confirm('Are you sure you want to delete this contact?')) {
            addresses = addresses.filter(function(address) {
                return address.id !== id;
            });
            showList();
        }
    }
});

$('#show').on('click', $('#back'), function(event) {
    event.target.id === 'back' && showList();
});

function renderShow(addressesArray) {
    $('#show').html('');

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = addressesArray[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var address = _step4.value;

            return $('#show').append('<div class=\'list\' id=\'' + address.id + '\'><strong>' + address.name + '</strong>\n    click to view contact details\n        <div>\n        <button class=\'btn btn-primary edit\' id=\'' + address.id + '\' >Edit</button>\n        <button class=\'delete btn btn-danger\' id=\'' + address.id + '\'>Delete</button>\n        </div>\n        </div>');
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }
};

$('#autocomplete').on("change keyup paste", function(event) {
    var searchContent = event.target.value.toLowerCase();
    var searchAddresses = addresses.filter(function(address) {
        return address.name.toLowerCase().includes(searchContent) || address.phone.toLowerCase().includes(searchContent) || address.email.toLowerCase().includes(searchContent) || address.address.toLowerCase().includes(searchContent);
    });
    renderShow(searchAddresses);
});