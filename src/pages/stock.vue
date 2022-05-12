<template>
  <main class="mx-auto w-10/12 mt-4">
    <Header />
    <Suspense>
      <Content />
      <template #fallback>
        <h2 class="text-lg font-lato font-semibold tracking-wide leading-4 text-indigo-300">
          Loading...
        </h2>
      </template>
    </Suspense>
  </main>
</template>
