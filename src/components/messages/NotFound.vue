<template>
    <div class="notification-content">
        <div>
            <img  alt="not found image" src="/img/not-found.svg"/>
            <h1 class="mt-3 font-weight-bold">404. Контент не завезли.</h1>
            <p class="text-center">Вернитесь обратно и подождите.
                <router-link :to="{name: 'layout'}">Вернуться</router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
name: "NotFound"
}
</script>

<style scoped>

</style>