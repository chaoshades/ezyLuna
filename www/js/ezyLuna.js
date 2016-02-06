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