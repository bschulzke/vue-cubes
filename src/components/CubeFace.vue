<template>
    <div style="display: flex">
        <div>
            <div :class="['square', topLeft]"></div>
            <div :class="['square', bottomLeft]"></div>
        </div>
        <div>
            <div :class="['square', topRight]"></div>
            <div :class="['square', bottomRight]"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CubeFace',
    props: {
        topLeft: String,
        topRight: String,
        bottomLeft: String,
        bottomRight: String
    }
}
</script>

<style scoped>

.square {
    height: 96px;
    width: 96px;
    border: 2px solid black;
}

.red {
    background: hsla(0, 100%, 50%, 0.8);
}

.blue {
    background: hsla(230, 100%, 50%, 0.8);
}

.green {
    background: hsla(118, 100%, 50%, 0.8);
}

.orange {
    background: hsla(23, 100%, 50%, 0.8);
}

.yellow {
    background: hsla(59, 100%, 50%, 0.8);
}

.white {
    background: hsla(60, 11%, 98%, 0.8);
}

</style>