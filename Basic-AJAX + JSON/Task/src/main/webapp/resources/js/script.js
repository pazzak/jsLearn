$(function() {

    var regForm = {};
    var blueprintRow;
    var $rowToChange;
    var $table;

    var AJAX_ADD_NEW_EMPLOYEE_URL = '/ajaxNew';
    var AJAX_CHANGE_EMPLOYEE_URL = '/ajaxChange';
    var AJAX_DELETE_EMPLOYEE_URL = '/ajaxDelete';

    (function initialize() {
        initRegistrationForm();
        var $overallWrapper = $('.employees');
        blueprintRow = $('.employees__blueprint-for-rows').find('.employees__unit')[0];
        $table = $('.employees__list__table');

        $('.employees__register-button').click(showRegistrationForm);
        $overallWrapper.find('.edit-button').on('click', editEmployeeForm);
        $overallWrapper.find('.delete-button').on('click', deleteRow);
    }());

    function getUnitObject($wrapper) {
        var unit = {};
        unit.id = $wrapper[0].dataset.id;
        unit.$firstName = $wrapper.find('.first-name')[0];
        unit.$lastName = $wrapper.find('.last-name')[0];
        unit.$birthDate = $wrapper.find('.birth-date')[0];
        unit.$joinDate = $wrapper.find('.join-date')[0];
        unit.$linkToRm = $wrapper.find('.link-to-rm')[0];
        unit.$linkToPm = $wrapper.find('.link-to-pm')[0];
        unit.$techList = $wrapper.find('.tech-list')[0];
        return unit;
    }

    function initRegistrationForm() {
        regForm.$wrapper = $('.registration-form__wrapper');
        regForm.$registerBtn = regForm.$wrapper.find('.register-btn');
        regForm.$changeBtn = regForm.$wrapper.find('.change-btn');

        regForm = $.extend({}, regForm, getUnitObject(regForm.$wrapper));
        regForm.$wrapper.find('.registration-form__close-btn').click(hideRegistrationForm);
        regForm.$registerBtn.click(onRegisterBtnClick);
        regForm.$changeBtn.click(onChangeBtnClick);
    }

    function onRegisterBtnClick() {
        var data = readForm();
        postJSON(AJAX_ADD_NEW_EMPLOYEE_URL, data, function(data) {
            var $row = getNewRow();
            fillRow($row, data);
            $table.append($row);
        });
        hideRegistrationForm();
    }

    function onChangeBtnClick() {
        var data = readForm();
        postJSON(AJAX_CHANGE_EMPLOYEE_URL, data, function() {
            fillRow($rowToChange, data);
        });
        hideRegistrationForm();
    }

    function postJSON(url, data, callback) {
        return jQuery.ajax({
           'type': 'POST',
           'url': url,
           'contentType': 'application/json;charset=UTF-8',
           'data': JSON.stringify(data),
           'success': callback
       });
    }

    function editEmployeeForm(element) {
        $rowToChange = $(element.currentTarget.parentElement.parentElement);
        var data = readRow($rowToChange);
        fillForm(data);
        showEditForm();
    }

    function getNewRow() {
        return $(blueprintRow.cloneNode(true));
    }

    function fillRow($row, data) {
        var unit = getUnitObject($row);
        unit.id = data.id;
        unit.$firstName.textContent = data.firstName;
        unit.$lastName.textContent = data.lastName;
        unit.$birthDate.textContent = data.birthDate;
        unit.$joinDate.textContent = data.joinDate;
        unit.$linkToRm.textContent = data.linkToRm;
        unit.$linkToPm.textContent = data.linkToPm;
        unit.$techList.textContent = data.techList;
    }

    function readRow($row) {
        var data = {};
        var unit = getUnitObject($row);

        data.id = unit.id;
        data.firstName = (unit.$firstName.textContent || unit.$firstName.innerText).trim();
        data.lastName = (unit.$lastName.textContent || unit.$lastName.innerText).trim();
        data.birthDate = (unit.$birthDate.textContent || unit.$birthDate.innerText).trim();
        data.joinDate = (unit.$joinDate.textContent || unit.$joinDate.innerText).trim();
        data.linkToRm = (unit.$linkToRm.textContent || unit.$linkToRm.innerText).trim();
        data.linkToPm = (unit.$linkToPm.textContent || unit.$linkToPm.innerText).trim();
        data.techList = (unit.$techList.textContent || unit.$techList.innerText).trim();

        return data;
    }

    function deleteRow(element) {
        var $row = element.currentTarget.parentElement.parentElement;
        var id = $row.dataset.id;
        var unit = {id : id};

        postJSON(AJAX_DELETE_EMPLOYEE_URL, unit, function() {
            $row.remove();
        });
    }

    function fillForm(data) {
        regForm.id = data && data.id || '';
        regForm.$firstName.value = data && data.firstName || '';
        regForm.$lastName.value = data && data.lastName || '';
        regForm.$birthDate.value = data && data.birthDate || '';
        regForm.$joinDate.value = data && data.joinDate || '';
        regForm.$linkToRm.value = data && data.linkToRm || '';
        regForm.$linkToPm.value = data && data.linkToPm || '';
        regForm.$techList.value = data && data.techList || '';
    }

    function readForm() {
        var data = {};
        data.id = regForm.id;
        data.firstName = regForm.$firstName.value;
        data.lastName = regForm.$lastName.value;
        data.birthDate = regForm.$birthDate.value;
        data.joinDate = regForm.$joinDate.value;
        data.linkToRm = regForm.$linkToRm.value;
        data.linkToPm = regForm.$linkToPm.value;
        data.techList = regForm.$techList.value;
        return data;
    }

    function showEditForm() {
        activateDeactivate(regForm.$changeBtn, true);
        activateDeactivate(regForm.$wrapper, true);
    }

    function showRegistrationForm() {
        activateDeactivate(regForm.$registerBtn, true);
        activateDeactivate(regForm.$wrapper, true);
    }

    function hideRegistrationForm() {
        fillForm();
        activateDeactivate(regForm.$registerBtn, false);
        activateDeactivate(regForm.$changeBtn, false);
        activateDeactivate(regForm.$wrapper, false);
    }

    function activateDeactivate(item, flag) {
        item.toggle(flag, 'active');
    }

});