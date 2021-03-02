import generateId from "./randomId";
import i18n from "@/i18n"
const _ = require('lodash');

const constructorHelper = {
    simpleTypePropertyFabric(inputType) {
        let type = "string"
        if (inputType === "checkbox") {
            type = "array"
        }
        return {
            id: generateId(),
            inputType: inputType,
            type: type,
            rules: {
                required: {
                    value: true,
                    errMsg: i18n.t('constructor.default-err-msg')
                }
            },
            ui: {
                columns: 12,
                label: "",
                placeholder: "",
                widget: inputType,
                disabled: false,
                readonly: false,
                hidden: false,
                widgetConfig: {
                    showState: true,
                    locale:"ru"//?
                }
            }
        }
    },

    templateObjectFabric(inputType = "input") {
        return {
            id: generateId(),
            type: "object", 
            properties: [this.simpleTypePropertyFabric(inputType)],
            ui: {
                legend: i18n.t('constructor.default-group-name')
            },
            value: {}
        }
    },

    createPropertyCopy(data, templateId, propertyId) {
        let [propetyToCopy, index] = this.findPropertyById(data, templateId, propertyId);
        let copy = _.cloneDeep(propetyToCopy);
        let newId = generateId();
        copy.id = newId;
        return [copy, index];
    },
    deletePropertyById(data, templateId, propertyId) {
        let template = this.findTempalteById(data, templateId);
        template.properties = template.properties.filter(item => item.id !== propertyId);
        if (template.properties.length === 0) {
            data = this.deleteTemplateById(data, templateId);
        }
 
        return data
    },
    deleteTemplateById(data, templateId) {
        data = data.filter(item => item.id !== templateId);
        return data;
    },
    addProperty(template, newProperty, insertIndex) {
        let index = insertIndex ?? template.properties.length ;
        let newProp = newProperty ?? this.simpleTypePropertyFabric("input");
        template.properties.splice(index, 0, newProp);
        return template;
    },
    findPropertyById(data, templateId, propertyId) {
        let template = this.findTempalteById(data, templateId);
        let property = template.properties.find(item => item.id === propertyId);
        let index = template.properties.indexOf(property);
        return [property, index];
    },
    findTempalteById(data, templateId) {
        return data.find(item => item.id === templateId);
    },
    replaceProperty(data, templateId, propertyId, newProperty) {
        let [prop,] = this.findPropertyById(data, templateId, propertyId);
        Object.assign(prop, newProperty);
        return data;
    }

}

export default constructorHelper;