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
 * Set a tag with an array of values
 * @param {Number} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 * @param {Array} valSelectosr: Array of input value selectors.
 */
function setValuesTag(tags, chkSelector, tag, valSelectors) {
    var values = [];
    for (var i = 0; i < valSelectors.length; i++) {
        var value = $(valSelectors[i]).val();
        if (value)
            values.push(value);
    }

    if ($(chkSelector).is(':checked') && values)
        tags.push(new NoteTag(tag, values));
}

/**
 * Set a tag with a signed value
 * @param {Number} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 * @param {String} valSelector: Input value selector.
 */
function setSignedValueTag(tags, chkSelector, tag, valSelector) {
    var value = $(valSelector).val();
    if ($(chkSelector).is(':checked') && value) {
        if (value > 0)
            value = "+" + value;
        tags.push(new NoteTag(tag, value));
    }
}

/**
 * Enable/Disable inputs linked to a checkbox
 * @param {Object} chk: Checkbox selector.
 */
function enableInputs(chk) {
    var attr = null;

    ctrl = $(chk).parents('.input-group-addon').siblings('input, select');
    // For form-control div only (ex.: radio button group)
    if (ctrl.length === 0)
        ctrl = $(chk).parents('.input-group-addon').next();

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

/**
 * Open collapsed div if any checkbox is checked
 * @param {Object} collapsed_div: collapsed div object.
 */
function openCollapse(collapsed_div) {
    if ($(collapsed_div).find('input[type=checkbox].js_Tags').is(':checked'))
        $(collapsed_div).addClass('in');
};

/**
 * Download content into a file
 * @param {String} filename: name of the file
 * @param {String} text: text content of the file
 */
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

// Utils classes

/**
 * The Tag class defines a tag.
 * @param {String} tag: Name of the tag. 
 * @param {String/Array/Object} data: The data contained in the tag.
 */
function NoteTag(tag, data) {
    this.tag = String(tag);
    this.data = data;
}

/**
 * The TagParser class defines a tag parser.
 * @param {String} id: Unique id of the tag. 
 * @param {Object} data: The parser object.
 * @param {String} tag: Name of the tag (optional). 
 */
function TagParser(id, parser, tag) {
    this.id = String(id);
    this.parser = parser;
    if (tag)
        this.tag = String(tag);
    else
        this.tag = this.id;
}

/**
 * The Project class defines a project config.
 * @param {String} url: url to the project. 
 */
function Project(url) {
    this.url = String(url);
}

/**
 * The Plugin class defines a plugin config.
 * @param {String} name: name to the plugin. 
 * @param {String} version: version of the plugin.
 * @param {String} help_url: url of the help of the plugin.
 * @param {Object} tags: array of tags of the plugin. 
 */
function Plugin(name, version, help_url, tags) {
    this.name = String(name);
    this.version = String(version);
    this.help_url = String(help_url);
    this.tags = tags;
}
