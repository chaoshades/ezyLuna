// Utils functions

/**
 * Pad a number with a character or zeros.
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
 * Set a basic tag.
 * @param {Array} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 */
function setTag(tags, chkSelector, tag) {
    if ($(chkSelector).is(':checked'))
        tags.push(new NoteTag(tag));
}

/**
 * Set a tag with a value.
 * @param {Array} tags: Tags array. 
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
 * Get a percent value from a value.
 * @param {Number} value: Value.
 */
function getPercentValue(value) {
    return value / 100;
}

/**
 * Extract a value from a percent value.
 * @param {Number} percent_value: Percent value to extract.
 */
function extractFromPercentValue(percent_value) {
    return percent_value * 100
}

/**
 * Set a tag with a percentage value.
 * @param {Array} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 * @param {String} valSelector: Input value selector.
 */
function setPercentValueTag(tags, chkSelector, tag, valSelector) {
    var value = $(valSelector).val();
    if ($(chkSelector).is(':checked') && value)
        tags.push(new NoteTag(tag, getPercentValue(value)));
}

/**
 * Set a tag with an array of values.
 * @param {Array} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 * @param {Array} valSelectors: Array of input value selectors.
 */
function setValuesTag(tags, chkSelector, tag, valSelectors) {
    var values = [];
    for (var i = 0; i < valSelectors.length; i++) {
        var value = $(valSelectors[i]).val();
        if (value)
            values.push(value);
    }

    if ($(chkSelector).is(':checked') && values.length > 0)
        tags.push(new NoteTag(tag, values));
}

/**
 * Get a signed value from a value
 * @param {Number} value: Value to sign.
 */
function getSignedValue(value) {
    return (value > 0) ? "+" + value : value;
}

/**
 * Extract a value from a signed value.
 * @param {Number} signed_value: Signed value to extract.
 */
function extractFromSignedValue(signed_value) {
    return signed_value.replace('+', '');
}

/**
 * Set a tag with a signed value.
 * @param {Array} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 * @param {String} valSelector: Input value selector.
 */
function setSignedValueTag(tags, chkSelector, tag, valSelector) {
    var value = $(valSelector).val();
    if ($(chkSelector).is(':checked') && value) {
        value = getSignedValue(value);
        tags.push(new NoteTag(tag, value));
    }
}

/**
 * Set a tag with a signed value.
 * @param {Array} tags: Tags array. 
 * @param {String} chkSelector: Checkbox selector.
 * @param {String} tag: Tag to create. 
 * @param {String} valSelector: Input value selector.
 */
function setSignedPercentValueTag(tags, chkSelector, tag, valSelector) {
    var value = $(valSelector).val();
    if ($(chkSelector).is(':checked') && value) {
        value = getSignedValue(getPercentValue(value));
        tags.push(new NoteTag(tag, value));
    }
}

/**
 * Set a tag with an object value.
 * @param {Array} tags: Tags array. 
 * @param {Object} state_data: State object. 
 * @param {String} stateSelector: State data selector.
 * @param {String} tag: Tag to create. 
 * @param {Function} objFx: Function to execute to extract object value from state.
 */
function setObjectTag(tags, state_data, stateSelector, tag, objFx) {
    if (state_data[stateSelector].enabled) {
        var objects = _.map(state_data[stateSelector].data, objFx);
        if (objects.length > 0)
            _.each(objects, function (obj) { tags.push(new NoteTag(tag, obj)); });
    }
}

/**
 * Set a tag with an object data value.
 * @param {Array} tags: Tags array. 
 * @param {Object} state_data: State object. 
 * @param {String} stateSelector: State data selector.
 * @param {String} tag: Tag to create.
 * @param {Function} valFx: Function to execute to extract value from state.
 */
function setObjectValuesTag(tags, state_data, stateSelector, tag, valFx) {
    if (state_data[stateSelector].enabled) {
        var values = _.map(state_data[stateSelector].data, valFx);
        if (values.length > 0)
            tags.push(new NoteTag(tag, values));
    }
}

/**
 * Enable/Disable inputs linked to a checkbox.
 * @param {Object} chk: Checkbox element.
 */
function enableInputs(chk) {
    var attr = null;

    var ctrls = $(chk).parents('.input-group-addon').siblings('input, select');
    // For form-control div only (ex.: radio button group)
    if (ctrls.length === 0)
        ctrls = $(chk).parents('.input-group-addon').next();
    // For controls within inline edit table
    if (ctrls.length === 0)
        ctrls = $(chk).parents('.checkbox').next().find('table input, table select, table button, .btn-toolbar button');

    if ($(chk).is(':checked')) {
        $(ctrls).each(function (i, c) {
            var ctrl = $(c);
            if (ctrl.is('select') || ctrl.hasClass('radio') || ctrl.hasClass('checkbox') || ctrl.is('button'))
                attr = 'disabled';
            else
                attr = 'readonly';

            if (ctrl.hasClass('radio'))
                ctrl.find('input[type=radio]').removeAttr(attr);
            else if (ctrl.hasClass('checkbox'))
                ctrl.find('input[type=checkbox]').removeAttr(attr);

            ctrl.removeAttr(attr);
        });
    } else {
        $(ctrls).each(function (i, c) {
            var ctrl = $(c);
            if (ctrl.is('select') || ctrl.hasClass('radio') || ctrl.hasClass('checkbox') || ctrl.is('button'))
                attr = 'disabled';
            else
                attr = 'readonly';

            if (ctrl.hasClass('radio'))
                ctrl.find('input[type=radio]').attr(attr, attr);
            else if (ctrl.hasClass('checkbox'))
                ctrl.find('input[type=checkbox]').attr(attr, attr);

            ctrl.attr(attr, attr);
        });
    }
}

/**
 * Clear active menu item from within container.
 * @param {Object} container: Container object.
 */
function clearActiveMenuItem(container) {
    $(container).find('.list-group > .active').removeClass('active');
};

/**
 * Set active menu item from base url and id from within container.
 * @param {Object} container: Container object.
 * @param {String} hash: Hash of the menu item to set active.
 */
function setActiveMenuItem(container, hash) {
    clearActiveMenuItem(container);
    $(container).find('.list-group a[href="' + hash + '"]').addClass('active');
    $(container).find('.carousel .item:has(.list-group a.active)').addClass('active');
};

/**
 * Open collapsed div if any checkbox is checked.
 * @param {Object} collapsed_div: Collapsed div object.
 */
function openCollapse(collapsed_div) {
    if ($(collapsed_div).find('input[type=checkbox].js_Tags').is(':checked'))
        $(collapsed_div).addClass('in');
};

/**
 * Download content into a file.
 * @param {String} filename: Name of the file.
 * @param {String} text: Text content of the file.
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

/**
 * Scroll page to the top
 */
function scrollUp() {
    scrollTo(0);
}

/**
 * Scroll page to specific div
 * @param {Object} div: Div to scroll to.
 */
function scrollToDiv(div) {
    // Navbar height + margin of div
    var adjustment = $('nav.navbar').height() + parseInt($(div).css('margin-bottom'));
    scrollTo($(div).offset().top - adjustment);
}

/**
 * Scroll page to specific top position
 * @param {Integer} top: Position to scroll to.
 */
function scrollTo(top) {
    $('body').animate({
        scrollTop: top
    }, 'easeOutExpo');
}

/**
 * Toggle all collapsible divs and reposition affix if necessary.
 * @param {Object} container: Container object.
 * @param {Boolean} collapsed: True if already collapsed, else false.
 */
function toggleAll(container, collapsed) {
    // Excludes collapse in navigation bar and in sidebars
    var divs = $(container).find('div.collapse').not('.navbar-collapse').not('.sidebar .collapse');
    if (collapsed) {
        divs.collapse('show');
        collapsed = false;
    } else {
        divs.collapse('hide');
        collapsed = true;
    }

    if (!collapsed)
        removeAffixBottom($('.sidebar'));

    return collapsed;
}

/**
 * Bootsrap fix to remove affix-bottom when opening collapsible divs.
 * @param {Object} affix: Container that is "affixable".
 */
function removeAffixBottom(affix) {
    if (affix.hasClass('affix-bottom')) {
        affix.removeClass('affix-bottom');
        affix.addClass('affix');
        affix.css('top', '');
    }
}

/**
 * Format a control id from a tag
 * @param {String} tag: Name of the tag.
 * @param {Integer} uid: Unique id for the control.
 */
function formatCtrlId(tag, uid) {
    return tag.replace(" ", "") + uid.toString();
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
 * The Extension class defines an extension tag.
 * @param {String} ext: Name of the tag. 
 * @param {String/Array/Object} data: The data contained in the extension tag.
 */
function ExtensionTag(ext, data) {
    this.ext = String(ext);
    this.data = data;
    this.position = -1;
}

/**
 * The TagParser class defines a tag parser.
 * @param {String} id: Unique id of the tag. 
 * @param {Object} parser: The parser object.
 * @param {String} tag: Name of the tag (optional). 
 * @param {String} ext_plugin: Name of the plugin this tag has extensions (optional). 
 */
function TagParser(id, parser, tag, ext_plugin) {
    this.id = String(id);
    this.parser = parser;
    if (tag)
        this.tag = String(tag);
    else
        this.tag = this.id;
    if (ext_plugin)
        this.ext_plugin = String(ext_plugin);
}

/**
 * The ExtensionParser class defines an extension parser.
 * @param {String} plugin: Name of the plugin this extension is for. 
 * @param {String} id: Unique id of the extension. 
 * @param {Object} parser: The parser object.
 * @param {String} ext: Name of the extension (optional). 
 */
function ExtensionParser(plugin, id, parser, ext) {
    this.plugin = plugin;
    this.id = String(id);
    this.parser = parser;
    if (ext)
        this.ext = String(ext);
    else
        this.ext = this.id;
}

/**
 * The Project class defines a project config.
 * @param {String} url: Url to the project. 
 */
function Project(url) {
    this.url = String(url);
}

/**
 * The Plugin class defines a plugin config.
 * @param {String} name: Name of the plugin. 
 * @param {String} longname: Longname to the plugin. 
 * @param {String} version: Version of the plugin.
 * @param {String} description: Description of the plugin.
 * @param {String} help_url: Url of the help of the plugin.
 * @param {Object} tags: Array of tags of the plugin. 
 * @param {Object} exts: Array of extensions of the plugin. 
 */
function Plugin(name, longname, version, description, help_url, tags, exts) {
    this.name = String(name);
    this.longname = String(longname);
    this.version = String(version);
    this.description = String(description);
    this.help_url = String(help_url);
    this.tags = tags;
    this.exts = exts;
}

/**
 * The QuickAccessItem class defines an item for the QuickAccess for the typeahead.
 * @param {String} id: Id of the item. 
 * @param {String} name: Name to the item (used to search). 
 * @param {String} url: Url of the item.
 */
function QuickAccessItem(id, name, url) {
    this.id = String(id);
    this.name = String(name);
    this.url = String(url);;
}

/**
 * The QuickScrollItem class defines an item for the QuickScroll for the typeahead.
 * @param {String} id: Id of the item. 
 * @param {String} name: Name to the item (used to search). 
 */
function QuickScrollItem(id, name) {
    this.id = String(id);
    this.name = String(name);
}

/**
 * The InlineEditTableTemplateSet class defines a set of partials templates for the inline edit table.
 * @param {Object} container: Container object.
 * @param {String} selector: Partial template selector.
 */
function InlineEditTableTemplateSet(container, selector) {
    this.setID = selector.substring(1);
    this.templates = [
        new InlineEditTableTemplate(container, selector + '-headers'),
        new InlineEditTableTemplate(container, selector + '-edit'),
        new InlineEditTableTemplate(container, selector + '-read'),
        new InlineEditTableTemplate(container, selector + '-empty')
    ];
}

/**
 * The InlineEditTableTemplate class defines a partial template for the inline edit table.
 * @param {Object} container: Container object.
 * @param {String} selector: Partial template selector.
 */
function InlineEditTableTemplate(container, selector) {
    this.name = selector.substring(1);
    this.template = $(container).find(selector).html();
}

/**
 * The InlineEditTableTemplateInfo class defines templates informations for the inline edit table.
 * @param {Object} set: Set of partials templates object.
 */
function InlineEditTableTemplateInfo(set) {
    this.setID = set.setID;
    for (var i = 0; i < set.templates.length; i++) {
        var t = set.templates[i];
        if (t.name.indexOf('-headers') > 0)
            this.headers_template = t.name;
        else if (t.name.indexOf('-read') > 0)
            this.read_template = t.name;
        else if (t.name.indexOf('-edit') > 0)
            this.edit_template = t.name;
        else if (t.name.indexOf('-empty') > 0)
            this.empty_template = t.name;
    }
}

/**
 * The InlineEditTableDataInfo class defines data information for the inline edit table.
 * @param {Boolean} enabled: True if it should be enabled, else false.
 * @param {Array} data: The data for the inline edit table.
 */
function InlineEditTableDataInfo(enabled, data) {
    this.enabled = enabled;
    this.data = data;
}

/**
 * The InlineEditTimelineTemplateSet class defines a set of partials templates for the inline edit timeline.
 * @param {Object} container: Container object.
 * @param {String} selector: Partial template selector.
 */
function InlineEditTimelineTemplateSet(container, selector) {
    this.setID = selector.substring(1);
    this.templates = [
        new InlineEditTimelineTemplate(container, selector + '-edit'),
        new InlineEditTimelineTemplate(container, selector + '-read')
    ];
}

/**
 * The InlineEditTimelineTemplate class defines a partial template for the inline edit timeline.
 * @param {Object} container: Container object.
 * @param {String} selector: Partial template selector.
 */
function InlineEditTimelineTemplate(container, selector) {
    this.name = selector.substring(1);
    this.template = $(container).find(selector).html();
}

/**
 * The InlineEditTimelineTemplateInfo class defines templates informations for the inline edit timeline.
 * @param {Object} set: Set of partials templates object.
 */
function InlineEditTimelineTemplateInfo(set) {
    this.setID = set.setID;
    for (var i = 0; i < set.templates.length; i++) {
        var t = set.templates[i];
        if (t.name.indexOf('-read') > 0)
            this.read_template = t.name;
        else if (t.name.indexOf('-edit') > 0)
            this.edit_template = t.name;
    }
}

/**
 * The InlineEditTimelineDataInfo class defines data information for the inline edit timeline.
 * @param {Boolean} enabled: True if it should be enabled, else false.
 * @param {Array} data: The data for the inline edit timeline.
 */
function InlineEditTimelineDataInfo(enabled, data) {
    this.enabled = enabled;
    this.data = data;
}