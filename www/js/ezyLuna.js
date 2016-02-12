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
 * 
 * @param {Number} tags: . 
 * @param {String} chkSelector: .
 * @param {String} tag: . 
 */
function setTag(tags, chkSelector, tag) {
    if ($(chkSelector).is(':checked'))
        tags.push(new NoteTag(tag));
}

/**
 * 
 * @param {Number} tags: . 
 * @param {String} chkSelector: .
 * @param {String} tag: . 
 * @param {String} valSelector: .
 */
function setValueTag(tags, chkSelector, tag, valSelector) {
    var value = $(valSelector).val();
    if ($(chkSelector).is(':checked') && value)
        tags.push(new NoteTag(tag, value));
}

/**
 * 
 * @param {Number} tags: . 
 * @param {String} chkSelector: .
 * @param {String} tag: . 
 * @param {String} valSelector: .
 */
function setPercentValueTag(tags, chkSelector, tag, valSelector) {
    var value = $(valSelector).val();
    if ($(chkSelector).is(':checked') && value)
        tags.push(new NoteTag(tag, value / 100));
}

/**
 * 
 * @param {Object} chk: .
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

