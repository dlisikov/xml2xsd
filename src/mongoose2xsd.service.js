const XSD_PARTS = require('./xsd-parts.constant');

class Mongoose2XsdService {
  createXSD(schema) {
    const aggregator = XSD_PARTS.header;

    for(const childKey in Object.keys(schema)) {
      this._addElement(aggregator, childKey, schema[childKey]);
    }

    aggregator += XSD_PARTS.footer;

    return aggregator;
  }

  _addElement(aggregator, elementKey, element, isArrayElement = false) {
    if (element.type) {
      aggregator += this._renderSelfClosedElement(elementKey, element.type, isArrayElement);
      return;
    }

    if (Array.isArray(element)) {
      aggregator += this._renderComplexElementStart(elementKey, isArrayElement);
      this._addElement(aggregator, 'element', element[0], true)
      aggregator += XSD_PARTS.complexElementEndFormat;
      return;
    }

    aggregator += this._renderComplexElementStart(elementKey, isArrayElement);
    for(const childKey in Object.keys(element)) {
      this._addElement(aggregator, childKey, element[childKey]);
    }
    aggregator += XSD_PARTS.complexElementEndFormat;
  }

  _renderSelfClosedElement(name, type, isArrayElement) {
    return isArrayElement ?
      XSD_PARTS.selfClosedArrayElementFormat.replace('[ELEMENT_NAME]', name).replace('[ELEMENT_TYPE]', type)
      : XSD_PARTS.selfClosedElementFormat.replace('[ELEMENT_NAME]', name).replace('[ELEMENT_TYPE]', type);
  }

  _renderComplexElementStart(type, isArrayElement) {
    return isArrayElement ? XSD_PARTS.complexArrayElementStartFormat.replace('[ELEMENT_NAME]', name)
      : XSD_PARTS.complexElementStartFormat.replace('[ELEMENT_NAME]', name);
  }
}

module.exports = new Mongoose2XsdService();