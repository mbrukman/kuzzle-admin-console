<template>
  <div class="row input-field">
    <p>{{name}}</p>
    <multiselect
      :options="options"
      :placeholder="name + ' values'"
      :value="valueAsArray"
      @input="updateValue"
      :taggable="true"
      tag-placeholder="Add this as new value."
      @tag="addValue"
      @remove="removeValue"
      :multiple="true">
    </multiselect>
  </div>
</template>

<script>
import { castByElementId } from 'services/collectionHelper'
import Multiselect from 'vue-multiselect'
import {} from 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'JsonFormItemMultiSelect',
  props: {
    content: Object,
    name: String,
    type: String,
    step: Number,
    parent: String,
    schema: Object
  },
  data() {
    return {
      values: null
    }
  },
  components: {
    Multiselect
  },
  computed: {
    options() {
      return this.schema.values || []
    },
    valueAsArray() {
      if (this.values && !Array.isArray(this.values)) {
        return [this.values]
      }

      return this.values
    }
  },
  methods: {
    initValue() {
      if (!Object.keys(this.content).length) {
        return
      }

      if (this.parent) {
        if (this.content[this.parent] && this.content[this.parent][this.name]) {
          this.values = this.content[this.parent][this.name]
        }
      } else {
        this.values = this.content[this.name]
      }
    },
    updateValue(newValues) {
      this.values = newValues
      this.$emit('update-value', { name: this.name, value: this.values })
    },
    addValue(value) {
      let castValue = castByElementId(this.schema.id, value)

      if (!castValue) {
        return
      }

      let _values = this.values ? [...this.values] : []

      if (_values.some(value => value === castValue)) {
        return
      }

      this.$emit('update-value', {
        name: this.name,
        value: _values.concat([castValue])
      })
    },
    removeValue(removedValue) {
      let castValue = castByElementId(this.schema.id, removedValue)

      if (!castValue) {
        return
      }

      let _values = this.values.filter(value => value !== castValue)
      this.$emit('update-value', { name: this.name, value: _values })
    }
  },
  mounted() {
    this.initValue()
  },
  watch: {
    content: 'initValue'
  }
}
</script>
