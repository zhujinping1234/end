import CodeEditor from './CodeEditor.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'CodeEditor',
  component: CodeEditor,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    appName: {
      control: {
        type: 'text'
      },
      type: { name: 'string', required: true },
      defaultValue: 'Hello',
      description: 'demo description',
      name: 'appName'
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CodeEditor },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<CodeEditor v-bind="args" />'
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args

Primary.args = {
  appName: 'vitejs-vite-jcy7tb'
}
