// Utils functions

/**
 * Pad a number with a character or zeros
 * @param {Number} n: Original value to pad. 
 * @param {Number} width: Maximum with to pad.
 * @param {String} z: Character to pad (optional) - Default character : 0. 
 */
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/**
 * Set a basic tag
 * @param {Number} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 */
function setTag(tags, chkSelector, tag) {
    if ($(chkSelector).is(':checked'))
        tags.push(new NoteTag(tag));
}

/**
 * Set a tag with a value
 * @param {Number} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 * @param {String} valSelector: Input value selector.
 */
function setValueTag(tags, chkSelector, tag, valSelector) {
    var value = $(valSelector).val();
    if ($(chkSelector).is(':checked') && value)
        tags.push(new NoteTag(tag, value));
}

/**
 * Set a tag with a percentage value
 * @param {Number} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 * @param {String} valSelector: Input value selector.
 */
function setPercentValueTag(tags, chkSelector, tag, valSelector) {
    var value = $(valSelector).val();
    if ($(chkSelector).is(':checked') && value)
        tags.push(new NoteTag(tag, value / 100));
}

/**
 * Enable/Disable inputs linked to a checkbox
 * @param {Object} chk: Checkbox selector.
 */
function enableInputs(chk) {
    var ctrl = $(chk).parent().next(),
        attr = null;
    if ($(chk).is(':checked')) {
        if (ctrl.is('select') || ctrl.hasClass('radio') || ctrl.hasClass('checkbox'))
            attr = 'disabled';
        else
            attr = 'readonly';

        if (ctrl.hasClass('radio'))
            $(ctrl).find('input[type=radio]').removeAttr(attr);
        else if (ctrl.hasClass('checkbox'))
            $(ctrl).find('input[type=checkbox]').removeAttr(attr);

        $(ctrl).removeAttr(attr);
    } else {
        if (ctrl.is('select') || ctrl.hasClass('radio') || ctrl.hasClass('checkbox'))
            attr = 'disabled';
        else
            attr = 'readonly';

        if (ctrl.hasClass('radio'))
            $(ctrl).find('input[type=radio]').attr(attr, attr);
        else if (ctrl.hasClass('checkbox'))
            $(ctrl).find('input[type=checkbox]').attr(attr, attr);

        $(ctrl).attr(attr, attr);
    }
}

/**
 * Clear active menu item from within container
 * @param {Object} container: container object.
 */
function clearActiveMenuItem(container) {
    $(container).find('.list-group > .active').removeClass('active');
};

/**
 * Set active menu item from base url and id from within container
 * @param {Object} container: container object.
 * @param {String} hash: hash of the menu item to set active.
 */
function setActiveMenuItem(container, hash) {
    clearActiveMenuItem(container);
    $(container).find('.list-group a[href="' + hash + '"]').addClass('active');
    $(container).find('.carousel .item:has(.list-group a.active)').addClass('active');
};

// Utils classes

/**
 * The Tag class defines a tag.
 * @param {String} tag: Name of the tag. 
 * @param {String} data: The data contained in the tag (JSON).
 */
function NoteTag(tag, data) {
    this.tag = String(tag);
    this.data = data;
}

