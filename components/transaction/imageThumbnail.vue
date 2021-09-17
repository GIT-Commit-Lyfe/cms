<template>
  <silent-box :gallery="gallery"></silent-box>
</template>

<script>
export default {
  data: () => ({
    gallery: [
      {
        src: 'https://cdn2.chrono24.com/images/uhren/20182313-1mx1jhbmybdo7jigj8n8zx8d-ExtraLarge.jpg',
        description: 'Rollex front',
        thumbnailWidth: '160px',
      },
      {
        src: 'https://cdn2.chrono24.com/images/uhren/20182313-oxqfv7k0cnxyavnujv89dx4q-ExtraLarge.jpg',
        description: 'Rollex perspective',
        thumbnailWidth: '160px',
      },
      {
        src: 'https://cdn2.chrono24.com/images/uhren/20182313-6wfawqo65770l4hf59lynowf-Large.jpg',
        description: 'Rollex perspective',
        thumbnailWidth: '160px',
      },
      {
        src: 'https://cdn2.chrono24.com/images/uhren/20182313-bxovllvrcwqdr6rqvvg08t58-Large.jpg',
        description: 'Rollex',
        thumbnailWidth: '160px',
      }
    ],
  }),
}
</script>