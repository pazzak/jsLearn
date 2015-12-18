$(function() {

    var regForm = {};
    var blueprintRow;

    var AJAX_ADD_NEW_EMPLOYEE_URL = '/ajaxNew';
    var AJAX_DELETE_EMPLOYEE_URL = '/ajaxDelete';

    (function initialize() {
        initRegistrationForm();
        var $overallWrapper = $('.employees');
        blueprintRow = $('.employees__blueprint-for-rows').find('.employees__unit')[0];

        $('.employees__register-button').click(showRegistrationForm);
        $('.registration-form__close-btn').click(hideRegistrationForm);
        $overallWrapper.find('.edit-button').on('click', editEmployeeForm);
        $overallWrapper.find('.delete-button').on('click', deleteRow);
        $('.employees__add-unit-button').on('click', addNew);
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
        regForm = $.extend({}, regForm, getUnitObject(regForm.$wrapper));
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
        var $row = element.currentTarget.parentElement.parentElement;
        var data = readRow($($row));
        fillForm(data);
        showRegistrationForm();
    }

    function getNewRow() {
        return blueprintRow.cloneNode(true);
    }

    function addNew() {
        var unit2 = {firstName : 'John', lastName : 'Smith', birthDate : '12-10-2014', joinDate : '13-10-2014',
            linkToRm : 'http://rm.ru', linkToPm : 'http://pm.ru', techList : 'tech list'};

        postJSON(AJAX_ADD_NEW_EMPLOYEE_URL, unit2, showConsoleResult);
    }

    function showConsoleResult(dat) {
        console.log("id: " + dat && dat.id || 'empty');
        console.log("firstName: " + dat && dat.firstName || 'empty');
        console.log("lastName: " + dat && dat.lastName || 'empty');
        console.log("birthDate: " + dat && dat.birthDate || 'empty');
        console.log("joiningDate: " + dat && dat.joinDate || 'empty');
        console.log("linkToRm: " + dat && dat.linkToRm || 'empty');
        console.log("linkToPm: " + dat && dat.linkToPm || 'empty');
        console.log("technicalList: " + dat && dat.techList || 'empty');
    }

    function addRow(data) {

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

    function showRegistrationForm() {
        regForm.$wrapper.addClass('active');
    }

    function hideRegistrationForm() {
        fillForm();
        regForm.$wrapper.removeClass('active');
    }

});