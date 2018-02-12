const mongoose2xsd = require('./mongoose2xsd.service');

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

    const expectedXSD = '<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
      '<xs:element name="root">' +
        '<xs:complexType>' +
          '<xs:sequence>' +
            '<xs:element name="address">' +
              '<xs:complexType>' +
                '<xs:sequence>' +
                  '<xs:element type="xs:string" name="city"/>' +
                  '<xs:element type="xs:byte" name="houseNumber"/>' +
                  '<xs:element type="xs:string" name="street"/>' +
                  '<xs:element type="xs:short" name="zipCode"/>' +
                '</xs:sequence>' +
              '</xs:complexType>' +
            '</xs:element>' +
            '<xs:element type="xs:byte" name="age"/>' +
            '<xs:element type="xs:string" name="name"/>' +
            '<xs:element name="nicknames">' +
              '<xs:complexType>' +
                '<xs:sequence>' +
                  '<xs:element type="xs:string" name="element" maxOccurs="unbounded" minOccurs="0"/>' +
                '</xs:sequence>' +
              '</xs:complexType>' +
            '</xs:element>' +
            '<xs:element name="skills">' +
              '<xs:complexType>' +
                '<xs:sequence>' +
                  '<xs:element name="element" maxOccurs="unbounded" minOccurs="0">' +
                    '<xs:complexType>' +
                      '<xs:sequence>' +
                        '<xs:element type="xs:string" name="level"/>' +
                        '<xs:element type="xs:string" name="name"/>' +
                      '</xs:sequence>' +
                    '</xs:complexType>' +
                  '</xs:element>' +
                '</xs:sequence>' +
              '</xs:complexType>' +
            '</xs:element>' +
          '</xs:sequence>' +
        '</xs:complexType>' +
      '</xs:element>' +
    '</xs:schema>';

    const xsd = mongoose2xsd.createXSD(schema);

    expect(xsd).toEqual(expectedXSD);
  });
});