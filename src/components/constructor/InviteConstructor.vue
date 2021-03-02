<template>
  <div class="invite-constructor">
    <b-row>
      <b-card style="width:100%" class="form-border-bottom">
        <b-input
          :placeholder="$t('constructor.template-name')"
          v-model="currentTemplate.name"
        ></b-input>
        <b-input
          :placeholder="$t('constructor.template-description')"
          size="sm"
          class="mt-2"
          v-model="currentTemplate.description"
        ></b-input>
        <b-row class="mt-2">
          <b-col>
            <b-icon-eye class="ml-3" scale="1.5" @click="onPreviewClick">
            </b-icon-eye>
          </b-col>
        </b-row>
      </b-card>
    </b-row>
    <b-modal id="preview_modal" :title="$t('constructor.preview')" size="lg">
      <constructor-view :template="currentTemplate.data"></constructor-view>
      <template #modal-footer="{ ok }">
        <b-button variant="success" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
    <b-modal id="settings_modal" :title="$t('constructor.settings')">
      <property-settings :settings_item="settings_item"></property-settings>
      <template #modal-footer="{ ok }">
        <b-button variant="success" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
    <draggable v-model="currentTemplate.data" group="people">
      <b-row
        class="mt-3"
        v-for="form in currentTemplate.data"
        v-bind:key="form.id"
      >
        <b-card class="w-100">
          <div v-if="form.inputType" class="ncform-no-legend">
            <b-row class="form-border-bottom">
              <b-col>
                <b-input :placeholder="$t('constructor.heading')" v-model="form.ui.legend">
                </b-input>
              </b-col>
              <b-col>
                <b-select
                  :options="typeSelect"
                  v-model="form.inputType"
                  @change="onSelectChange(form.inputType, form, true)"
                >
                </b-select>
              </b-col>
            </b-row>
            <ncform
              :form-schema="formSchemas[form.inputType]"
              :form-name="form.inputType"
            ></ncform>
            <hr />
            <b-row>
              <b-col class="option-icons">
                <b-icon-trash @click="onDeleteFormClick(form.id)">
                </b-icon-trash>
              </b-col>
            </b-row>
          </div>
          <div v-if="!form.inputType">
            <b-row class="form-border-bottom">
              <b-col md="12" class="pb-1">
                <b-input
                  v-model="form.ui.legend"
                  :placeholder="$t('constructor.group-name')"
                ></b-input>
              </b-col>
              <draggable :list="form.properties" :group="{ name: 'form' }" style="width:100%">
                <b-card
                  v-for="property in form.properties"
                  v-bind:key="property.id"
                  class="w-100"
                >
                  <b-row class="mt-2">
                    <b-col>
                      <b-input
                        :placeholder="$t('constructor.heading')"
                        v-model="property.ui.label"
                      >
                      </b-input>
                    </b-col>
                    <b-col>
                      <b-select
                        :options="typeSelect"
                        v-model="property.ui.widget"
                        @change="onSelectChange(property.ui.widget, form, false, property.id)"                                       
                      >
                      </b-select>
                    </b-col>
                  </b-row>
                  <div class="mt-3">
                    <b-row>
                      <b-col :md="property.ui.columns">
                        <div v-if="property.ui.widget == 'input'">
                          <b-input :disabled="true"> </b-input>
                        </div>

                        <div v-if="property.ui.widget == 'textarea'">
                          <b-form-textarea :disabled="true"> </b-form-textarea>
                        </div>

                        <div v-if="property.ui.widget == 'upload'">
                          <b-form-file :disabled="true"></b-form-file>
                        </div>

                        <div v-if="property.ui.widget == 'datepicker'">
                          <b-form-datepicker
                            :disabled="true"
                          ></b-form-datepicker>
                        </div>
                        <div v-if="property.ui.widget == 'radio'">
                          <radio-checkbox-constructor :config="property.ui.widgetConfig" :type="property.ui.widget"></radio-checkbox-constructor>
                        </div>
                        <div v-if="property.ui.widget == 'checkbox'">
                          <radio-checkbox-constructor :config="property.ui.widgetConfig" :type="property.ui.widget"></radio-checkbox-constructor>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                  <hr />
                  <b-row>
                    <b-col class="option-icons">
                      <b-icon-trash
                        @click="onDeletePropertyClick(form.id, property.id)"
                      >
                      </b-icon-trash>

                      <b-icon-gear
                        class="ml-3"
                        @click="onSettingFormClick(form.id, property.id)"
                      >
                      </b-icon-gear>

                      <b-icon-files
                        class="ml-3"
                        @click="onCopyFormClick(form.id, property.id)"
                      >
                      </b-icon-files>
                    </b-col>
                  </b-row>
                </b-card>
              </draggable>     
                <b-col style="text-align:center"
                  md="12"
                  @click="onAddPropertyClick(form.id)"
                  class="addProp"
                >
                  <b-icon-plus-circle scale="1.5"> </b-icon-plus-circle>
                </b-col>    
            </b-row>
          </div>
        </b-card>
      </b-row>
    </draggable>
    <b-row class="mt-3" v-if="currentTemplate.embed && currentTemplate.data.length < 1">
      <b-card class="w-100 addGroup" @click="onAddFormClick">
        <b-row class="justify-content-center">
          <b-icon-plus-circle scale="1.5"> </b-icon-plus-circle>
        </b-row>
      </b-card>
    </b-row>
    <b-row class="mt-3" v-else>
      <b-card class="w-100 addGroup" @click="onAddFormClick">
        <b-row class="justify-content-center">
          <b-icon-plus-circle scale="1.5"> </b-icon-plus-circle>
        </b-row>
      </b-card>
    </b-row>
    <b-row class="mt-3">
      <b-button @click="onSaveClick">
        {{$t('constructor.save')}}
      </b-button>
    </b-row>
  </div>
</template>

<script>
import generateId from "@/utils/randomId";
import constructorHelper from "@/utils/constructorHelper";
import ConstructorView from "./ConstructorView";
import PropertySettings from "./PropertySettings";
import draggable from "vuedraggable";
import RadioCheckboxConstructor from './RadioCheckboxConstructor.vue';

export default {
  components: {
    draggable,
    ConstructorView,
    PropertySettings,
    RadioCheckboxConstructor
  },

  data() {
    return {
        currentTemplate: {
        name: "",
        description: "",
        data: [],
        embed: false,
      },

      typeSelect: [
        { value: "input", text: "Текст" },
        { value: "textarea", text: "Много текста" },
        { value: "upload", text: "Файл" },
        { value: "datepicker", text: "Дата" },
        { value: "radio", text: "Один из списка" },
        { value: "checkbox", text: "Несколько из списка" },
        { value: "number", text: "Число"},
      ],

      typeSelectWithSchemas: [],

      formSchemas: {},

      settings_item: null,
    };
  },

  computed: {
    avaliableTemplates() {
      return this.$store.getters["invite/avaliableTemplates"];
    },
  },

  methods: {
    onSelectChange(inputType, form, embed, prop_id) {
      let template = this.formSchemas[inputType];
      if (template) {
        template.inputType = inputType;
        template.id = generateId();
        this.currentTemplate.data = constructorHelper.deletePropertyById(this.currentTemplate.data, form.id, prop_id)
        this.currentTemplate.data.push(template);
      } else {
        if (embed) {
          let index = this.currentTemplate.data.indexOf(form);
          this.currentTemplate.data.splice(index, 1, constructorHelper.templateObjectFabric(inputType));
        } else {
          let newProp = constructorHelper.simpleTypePropertyFabric(inputType)
          this.currentTemplate.data = constructorHelper.replaceProperty(this.currentTemplate.data, form.id, prop_id, newProp)
        }
      }
    },

    onSaveClick() {
      let data = this.currentTemplate.embed 
        ? JSON.stringify(this.currentTemplate.data[0])
        : JSON.stringify(this.currentTemplate.data);
      let payload = {
        name: this.currentTemplate.name,
        detailtype_description: this.currentTemplate.description,
        data,
        embed: this.currentTemplate.embed,
      };
      this.$store.dispatch("invite/addDetail", payload);
    },

    onDeleteFormClick(templateId) {
      this.currentTemplate.data = constructorHelper.deleteTemplateById(this.currentTemplate.data, templateId);
    },

    onDeletePropertyClick(templateId, deleteId) {
      this.currentTemplate.data = constructorHelper.deletePropertyById(this.currentTemplate.data, templateId,deleteId);
    },

    onAddFormClick() {
      let template = constructorHelper.templateObjectFabric();
      this.currentTemplate.data.push(template);
    },

    onAddPropertyClick(templateId) {
      let template = this.currentTemplate.data.find(item => item.id === templateId);
      constructorHelper.addProperty(template);
    },

    onSettingFormClick(templateId, settingsId) {
      [this.settings_item,] = constructorHelper.findPropertyById(this.currentTemplate.data, templateId, settingsId);
      this.$bvModal.show("settings_modal");
    },

    onCopyFormClick(templateId, copyId) {
      let template = this.currentTemplate.data.find(item => item.id === templateId);
      let [copy, index] = constructorHelper.createPropertyCopy(this.currentTemplate.data, templateId, copyId);
      constructorHelper.addProperty(template, copy, index);
    },

    onPreviewClick() {
      this.$bvModal.show("preview_modal");
    },
  },

  async mounted() {
    await this.$store.dispatch("invite/getAvaliableTemplates");
    let avaliableTemplates = this.$store.getters["invite/avaliableTemplates"];
    if (this.$route.query.schema) {
      this.currentTemplate = avaliableTemplates.find(
        (item) => item.uid === this.$route.query.schema
      );
      this.currentTemplate.data = JSON.parse(this.currentTemplate.data);
      this.currentTemplate.data = this.currentTemplate.embed
        ? [this.currentTemplate.data]
        : this.currentTemplate.data;
    }

    if (this.$route.query.embed) {
      this.currentTemplate.embed = true;
    }

    if (!this.currentTemplate.embed) {
      avaliableTemplates.forEach((template) => {
        let obj = JSON.parse(template.data);
        if (obj.properties) {
          this.formSchemas[template.uid] = obj;
          this.typeSelect.push({
            value: template.uid,
            text: template.name,
          });
        }
      });
    }
  },
};
</script>

<style>
.option-icons:hover {
  cursor: pointer;
}
.tools-options:hover {
  cursor: pointer;
}
.addGroup {
  background-color: rgba(108, 117, 125, 0.05);
}
.addGroup:hover {
  background-color: rgba(108, 117, 125, 0.2);
  cursor: pointer;
}
.addProp:hover {
  cursor: pointer;
}
.ncform-no-legend .__object-form-item legend {
  display: none;
}
.form-border-bottom .form-control {
    border-top: none;
    border-left: none;
    border-right: none;
}
.form-border-bottom .form-control:focus {
  box-shadow: none;
}
</style>
