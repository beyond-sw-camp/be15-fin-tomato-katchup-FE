<script setup>
import { onMounted, watch } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillResize from 'quill-resize-module';

Quill.register('modules/resize', QuillResize);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

let quill;


onMounted(() => {
  quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: '  내용을 입력하세요.',
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
        ],
        handlers: {

        },
      },
      resize: {
        parchment: {
          image: {
            attribute: ['width'], // ['width', 'height']
            limit: {
              minWidth: 200,
              maxWidth: 1000,
              maxHeight: 1000,
            },
          },
        },
      },
    },
  });

  quill.root.innerHTML = props.modelValue;

  // 수정할때 내용 그대로 가져가기
  quill.on('text-change', () => {
    emit('update:modelValue', quill.root.innerHTML);
  });
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (quill && quill.root.innerHTML !== newValue) {
      quill.root.innerHTML = newValue;
    }
  }
);
</script>

<template>
  <div class="editor-wrapper">
    <div id="editor"></div>
  </div>
</template>

<style scoped>
.editor-wrapper {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
}

#editor {
  min-height: 400px;
  background: white;
  padding: 10px;
}
</style>
