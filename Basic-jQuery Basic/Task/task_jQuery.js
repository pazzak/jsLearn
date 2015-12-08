$(function() {
    var jsonString = '{"products":[{"name":"Товар 1","price":"12555","count":"3","email":"z@z.zz"},' +
        '{"name":"Товар 3","price":"1555","count":"4323","email":"y@y.yy"},' +
        '{"name":"Товар 2","price":"1","count":"0","email":"x@x.xxx"}]}';
    var data = [];

    var $tableBody;
    var $searchBtn;
    var $modalAreYouSure;
    var $modalProperties;

    var $nameField;
    var $emailField;
    var $countField;
    var $priceField;

    var rowToDelete;
    var editMode;
    var currentElementOnEditMode;

    (function() {
        $tableBody = $('.table-body');
        $searchBtn = $('.table__top-block__search-btn');
        $modalAreYouSure = $('.modal__are-you-sure__wrapper');
        $modalProperties = $('.modal__properties__wrapper');

        $nameField = $('.modal__properties__name-field')[0];
        $emailField = $('.modal__properties__email-field')[0];
        $countField = $('.modal__properties__count-field')[0];
        $priceField = $('.modal__properties__price-field')[0];

        initialize();
    }());

    function initialize() {
        renderJSON();

        $('.table__top-block__add-btn').click(showPropertiesWindow);
        $('.sort-btn').on("click", sortListener);
        $('.modal__are-you-sure__yes-btn').click(deleteElement);
        $('.modal__are-you-sure__no-btn').click(hideAreYouSureWindow);
        $('.modal__properties__close-btn').click(hidePropertiesWindow);
        $('.modal__properties__add-update-btn').click(addUpdateProperties);

        console.log("initialized");
    }

    function renderJSON(e) {
        var jsonData = JSON.parse(jsonString);
        for (var i=0; i < jsonData.products.length; i++) {
            var name = jsonData.products[i].name;
            var price = parseInt(jsonData.products[i].price) || 0;
            var count = jsonData.products[i].count;
            var email = jsonData.products[i].email;
            var id = addNewRow(name, count, price);

            data.push({"id":id, "name":name, "count":count, "price":price, "email":email});
        }
    }

    function addNewRow(name, count, price) {
        var id = 'id_' + data.length;
        var tr = $('<tr id="' + id + '" class="table__row"/>');

        // generating cell 'name'
        var tdNameCell = $('<td class="table__name-cell">');
        var linkName = $('<a href="#" class="table__name-cell__name">' + name + '</a>');
        linkName.on("click", showPropertiesWindow);
        tdNameCell.append(linkName);
        tdNameCell.append('<div class="table__name-cell__count">' + count + '</div>');
        tr.append(tdNameCell);

        // generating cell 'price'
        tr.append('<td class="table__price-cell">' + price + ' $</td>');

        // generating cell 'actions'
        var tdActions = $('<td class="table__actions-cell">');
        var editBtn = $('<button class="table__edit-btn button">Edit</button>');
        editBtn.on("click", showPropertiesWindow);
        tdActions.append(editBtn);
        var deleteBtn = $('<button class="table__delete-btn button">Delete</button>');
        deleteBtn.on("click", showAreYouSureWindow);
        tdActions.append(deleteBtn);
        tr.append(tdActions);

        $tableBody.append(tr);

        return id;
    }

    function updateRow(id, name, count, price) {
        var row = $('#' + id);
        var nameField = row.children(".table__name-cell").children(".table__name-cell__name");
        var countField = row.children(".table__name-cell").children(".table__name-cell__count");
        var priceField = row.children('.table__price-cell');

        nameField.text(name);
        countField.text(count);
        priceField.text(price);
    }

    function showAreYouSureWindow(e) {
        rowToDelete = e.currentTarget.parentElement.parentElement;
        $modalAreYouSure.show();
    }

    function hideAreYouSureWindow(e) {
        $modalAreYouSure.hide();
    }

    function deleteElement(e) {
        rowToDelete.remove();
        $modalAreYouSure.hide();
    }

    function sortListener(e) {
        e.preventDefault();

        var direction = e.currentTarget.classList.contains('sort-btn-up') ? 1 : -1;
        var column = e.currentTarget.classList.contains('table__sort-name') ? 'name' : 'price';

        sortData(column, direction);
        updateTable();

        $('.table__sort-' + column).toggle();
    }

    function sortData(target, direction) {
        data.sort(function(x1, x2) {
            return x1[target] < x2[target] ? direction : x1[target] > x2[target] ? -direction : 0;
        });
    }

    function updateTable() {
        data.forEach(function(element) {
            $tableBody.append($('#' + element.id));
        });
    }

    function showPropertiesWindow(e) {
        e.preventDefault();
        editMode = e.currentTarget.classList.contains('table__edit-btn')
                || e.currentTarget.classList.contains('table__name-cell__name');

        if (editMode) {
            var id = e.currentTarget.parentElement.parentElement.id;
            data.filter(function(element) {
                if (element.id === id) {
                    currentElementOnEditMode = element;
                    fillPropertyForm(element.name, element.email, element.count, element.price);
                    return false;
                }
            });
        }

        $modalProperties.show();
    }

    function hidePropertiesWindow(e) {
        $modalProperties.hide();
    }

    function fillPropertyForm(name, email, count, price) {
        $nameField.value = name || "";
        $emailField.value = email || "";
        $countField.value = count || "";
        $priceField.value = price || "";
    }

    function clearPropertyForm() {
        fillPropertyForm();
    }

    function addUpdateProperties(e) {
        var name = $nameField.value;
        var email = $emailField.value;
        var count = $countField.value;
        var price = $priceField.value;
        var id;

        if (editMode) {
            currentElementOnEditMode.name = name;
            currentElementOnEditMode.email = email;
            currentElementOnEditMode.count = count;
            currentElementOnEditMode.price = price;

            id = currentElementOnEditMode.id;
            updateRow(id, name, count, price);
        } else {
            id = addNewRow(name, count, price);
            data.push({"id":id, "name":name, "count":count, "price":price, "email":email});
        }

        clearPropertyForm();
        hidePropertiesWindow(e);
    }
});