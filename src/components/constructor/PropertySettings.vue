<template>
  <div v-if="settings_item">
    <b-row>
      <b-col md="4">
        <label>{{ $t("constructor.width") }}</label>
      </b-col>
      <b-col>
        <b-input
          id="range-1"
          v-model="settings_item.ui.columns"
          type="range"
          min="1"
          max="12"
        ></b-input>
      </b-col>
    </b-row>
    <b-row class="mt-1" v-if="settings_item.ui.widget == 'input'">
      <b-col>
        <label for="range-1">{{ $t("constructor.data-type") }}</label>
      </b-col>
      <b-col>
        <b-select :options="avaliableInputTypes" v-model="settings_item.type"></b-select>
      </b-col>
    </b-row>
    <b-row class="mt-1" v-if="settings_item.ui.widget == 'radio'">
      <b-col>
        <b-form-checkbox
          v-model="settings_item.ui.widgetConfig.stacked"
          name="check-button"
          switch
        >
          {{ $t("constructor.stacked") }}
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col>
        <b-form-checkbox
          v-model="settings_item.ui.disabled"
          name="check-button"
          switch
        >
          {{ $t("constructor.disabled") }}
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col>
        <b-form-checkbox
          v-model="settings_item.ui.readonly"
          name="check-button"
          switch
        >
          {{ $t("constructor.readonly") }}
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col>
        <b-form-checkbox
          v-model="settings_item.ui.hidden"
          name="check-button"
          switch
        >
          {{ $t("constructor.hidden") }}
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col md="4">
        <label>{{ $t("constructor.placeholder") }}</label>
      </b-col>
      <b-col>
        <b-input
          placeholder="Placeholder"
          v-model="settings_item.ui.placeholder"
        >
        </b-input>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col>
        <b-form-checkbox
          v-model="settings_item.rules.required.value"
          name="check-button"
          switch
        >
          {{ $t("constructor.required") }}
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col>
        <b-form-checkbox
          v-model="settings_item.ui.widgetConfig.showState"
          name="check-button"
          switch
        >
          {{ $t("constructor.show-state") }}
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col>
        <label>{{ $t("constructor.err-msg") }}</label>
      </b-col>
      <b-col>
        <b-input
          placeholder="Сообщение о валидации"
          v-model="settings_item.rules.required.errMsg"
        >
        </b-input>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ['settings_item'],

  data() {
    return {
      avaliableInputTypes: [
        { value: "string", text: "Строка" },
        { value: "number", text: "Число" },
        { value: "integer", text: "Целое число" },
      ],
    }
  }
};
</script>

<style></style>
