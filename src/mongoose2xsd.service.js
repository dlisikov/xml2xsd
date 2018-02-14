const XSD_PARTS = require('./xsd-parts.constant');

const xsdTypeMap = {
  'Number': 'decimal',
  'String': 'string'
}

class Mongoose2XsdService {
  createXSD(schema) {
    let aggregator = XSD_PARTS.header;

    for(const childKey of Object.keys(schema)) {
      aggregator = this._addElement(aggregator, childKey, schema[childKey]);
    }

    aggregator += XSD_PARTS.footer;

    return aggregator;
  }

  _addElement(aggregator, elementKey, element, isArrayElement = false) {
    if (element.type) {
      aggregator += this._renderSelfClosedElement(elementKey, element.type, isArrayElement);
      return aggregator;
    }

    if (Array.isArray(element)) {
      aggregator += this._renderComplexElementStart(elementKey, isArrayElement);
      aggregator = this._addElement(aggregator, 'element', element[0], true)
      aggregator += XSD_PARTS.complexElementEndFormat;
      return aggregator;
    }

    aggregator += this._renderComplexElementStart(elementKey, isArrayElement);
    for(const childKey of Object.keys(element)) {
      aggregator = this._addElement(aggregator, childKey, element[childKey]);
    }
    aggregator += XSD_PARTS.complexElementEndFormat;
    return aggregator;
  }

  _renderSelfClosedElement(name, type, isArrayElement) {
    return isArrayElement ?
      XSD_PARTS.selfClosedArrayElementFormat.replace('[ELEMENT_NAME]', name).replace('[ELEMENT_TYPE]', xsdTypeMap[type.name])
      : XSD_PARTS.selfClosedElementFormat.replace('[ELEMENT_NAME]', name).replace('[ELEMENT_TYPE]', xsdTypeMap[type.name]);
  }

  _renderComplexElementStart(name, isArrayElement) {
    return isArrayElement ? XSD_PARTS.complexArrayElementStartFormat.replace('[ELEMENT_NAME]', name)
      : XSD_PARTS.complexElementStartFormat.replace('[ELEMENT_NAME]', name);
  }
}

module.exports = new Mongoose2XsdService();