$(function() {

    var regForm = {};
    var $blueprintRow;

    var ajaxAddNewUnitUrl = '/ajaxNew';
    var ajaxDeleteUnitUrl = '/ajaxDelete';

    (function initialize() {
        initRegistrationForm();
        var $overallWrapper = $('.employees');
        $blueprintRow = $('.employees__blueprint-for-rows');

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
        var $formWrapper = $('.registration-form__wrapper');
        regForm = getUnitObject($formWrapper);
        regForm.$wrapper = $formWrapper;
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
        return $blueprintRow.find('.employees__unit')[0].cloneNode(true);
    }

    function addNew() {
        var unit2 = {firstName : 'John', lastName : 'Smith', birthDate : '12-10-2014', joinDate : '13-10-2014',
            linkToRm : 'http://rm.ru', linkToPm : 'http://pm.ru', techList : 'tech list'};

        postJSON(ajaxAddNewUnitUrl, unit2, showConsoleResult);
    }

    function showConsoleResult(dat) {
        console.log("id: " + dat.id || 'empty');
        console.log("firstName: " + dat.firstName || 'empty');
        console.log("lastName: " + dat.lastName || 'empty');
        console.log("birthDate: " + dat.birthDate || 'empty');
        console.log("joiningDate: " + dat.joinDate || 'empty');
        console.log("linkToRm: " + dat.linkToRm || 'empty');
        console.log("linkToPm: " + dat.linkToPm || 'empty');
        console.log("technicalList: " + dat.techList || 'empty');
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

        postJSON(ajaxDeleteUnitUrl, unit, function() {
            $row.remove();
        });
    }

    function fillForm(data) {
        regForm.id = data.id || '';
        regForm.$firstName.value = data.firstName || '';
        regForm.$lastName.value = data.lastName || '';
        regForm.$birthDate.value = data.birthDate || '';
        regForm.$joinDate.value = data.joinDate || '';
        regForm.$linkToRm.value = data.linkToRm || '';
        regForm.$linkToPm.value = data.linkToPm || '';
        regForm.$techList.value = data.techList || '';
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
        regForm.$wrapper.removeClass('active');
    }

});