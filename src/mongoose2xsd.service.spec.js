const mongoose2xsd = require('./mongoose2xsd.service');
const { expect } = require('chai');

describe('when generating an xsd from a mongoose schema', () => {
  it('should create the expected XSD', () => {
    const schema = {
      name: { type: String },
      age: { type: Number },
      nicknames: [{ type: String }],
      skills: [{
        name: { type: String },
        level: { type: String }
      }],
      address: {
        street: { type: String },
        city: { type: String },
        zipCode: { type: Number },
        houseNumber: { type: Number }
      }
    };

    const expectedXSD = '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
      '<xs:element name="root"><xs:complexType><xs:sequence><xs:element name="name" type="xs:string"/>' +
      '<xs:element name="age" type="xs:decimal"/><xs:element name="nicknames"><xs:complexType><xs:sequence>' +
      '<xs:element name="element" type="xs:string" maxOccurs="unbounded" minOccurs="0"/></xs:sequence>' +
      '</xs:complexType></xs:element><xs:element name="skills"><xs:complexType><xs:sequence>' +
      '<xs:element name="element" maxOccurs="unbounded" minOccurs="0"><xs:complexType><xs:sequence>' +
      '<xs:element name="name" type="xs:string"/><xs:element name="level" type="xs:string"/></xs:sequence>' +
      '</xs:complexType></xs:element></xs:sequence></xs:complexType></xs:element><xs:element name="address">' +
      '<xs:complexType><xs:sequence><xs:element name="street" type="xs:string"/>' +
      '<xs:element name="city" type="xs:string"/><xs:element name="zipCode" type="xs:decimal"/>' +
      '<xs:element name="houseNumber" type="xs:decimal"/></xs:sequence></xs:complexType></xs:element>' +
      '</xs:sequence></xs:complexType></xs:element></xs:schema>';


    const xsd = mongoose2xsd.createXSD(schema);
    expect(xsd).equals(expectedXSD);
  });
});