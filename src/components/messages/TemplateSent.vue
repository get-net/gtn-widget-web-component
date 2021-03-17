<template>
    <div class="notification-content" style="margin-top: 20%;">
        <h1 class="mt-3 font-weight-bold text-center">Форма отправлена на подтверждение</h1>
        <div>
            <p class="text-center">
                После верификации данные для входа будут высланы на {{counterparty.name}}.
            </p>
        </div>
    </div>
</template>

<script>
export default {
name: "TemplateSent",
    computed: {
        counterparty() {
            return this.$store.getters['counterparty']
        }
    }
}
</script>

<style>
</style>