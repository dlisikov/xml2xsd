module.exports = {
  header: '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="root"><xs:complexType><xs:sequence>',
  footer: '</xs:sequence></xs:complexType></xs:element></xs:schema>',
  selfClosedElementFormat: '<xs:element name="[ELEMENT_NAME]" type="xs:[ELEMENT_TYPE]"/>',
  complexElementStartFormat: '<xs:element name="[ELEMENT_NAME]"><xs:complexType><xs:sequence>',
  complexElementEndFormat: '</xs:sequence></xs:complexType></xs:element>',

  selfClosedArrayElementFormat: '<xs:element name="element" type="xs:[ELEMENT_TYPE]" maxOccurs="unbounded" minOccurs="0"/>',

  complexArrayElementStartFormat: '<xs:element name="element" maxOccurs="unbounded" minOccurs="0"><xs:complexType><xs:sequence>',
  complexArrayElementEndFormat: '</xs:sequence></xs:complexType></xs:element>'
};