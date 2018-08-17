<template>
    <div id="page-not-found">
        <svg class="vector rounded mx-auto d-block" viewBox="0 0 24 24">
            <path fill="#dc3545" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
        <h1 class="text-danger text-center">Error 404: Page Not Found</h1>
    </div>    
</template>

<script>
export default {
    name: `page-not-found`
}
</script>

<style>
.vector {
    width: 100px;
    height: 100px;
    margin: 10px;
}
</style>