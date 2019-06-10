/*
 * GDevelop Core
 * Copyright 2008-present Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#include "PropertyDescriptor.h"
#include "GDCore/Serialization/SerializerElement.h"
#include "GDCore/String.h"
#include <vector>

namespace gd {

PropertyDescriptor::~PropertyDescriptor() {}

void PropertyDescriptor::SerializeTo(SerializerElement& element) const {

  element.AddChild("value").SetStringValue(currentValue);
  element.AddChild("type").SetStringValue(type);
  element.AddChild("label").SetStringValue(label);
  SerializerElement& extraInformationElement = element.AddChild("extraInformation");
  extraInformationElement.ConsiderAsArray();
  for(const gd::String& information: extraInformation) {
    extraInformationElement.AddChild("").SetStringValue(information);
  }
}

void PropertyDescriptor::UnserializeFrom(
    const SerializerElement& element) {
  currentValue = element.GetChild("value").GetStringValue();
  type = element.GetChild("type").GetStringValue();
  label = element.GetChild("label").GetStringValue();

  extraInformation.clear();
  const SerializerElement & extraInformationElement = element.GetChild("extraInformation");
  extraInformationElement.ConsiderAsArray();
  for (std::size_t i = 0; i < extraInformationElement.GetChildrenCount(); ++i)
    extraInformation.push_back(extraInformationElement.GetChild(i).GetStringValue());

}

}  // namespace gd
