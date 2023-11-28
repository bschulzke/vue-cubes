<template>
    <div style="display: flex">
        <div>
            <div :class="['square', face[0]]"></div>
            <div :class="['square', face[3]]"></div>
        </div>
        <div>
            <div :class="['square', face[1]]"></div>
            <div :class="['square', face[2]]"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CubeFace2x2',
    props: {
        face: Array
    }
}
</script>

<style scoped>

.square {
    height: 96px;
    width: 96px;
    border: 2px solid black;
    border-radius: 5px;
}

.red {
    background: hsla(0, 100%, 50%, 0.9);
}

.blue {
    background: hsla(230, 100%, 50%, 0.9);
}

.green {
    background: hsla(118, 100%, 50%, 0.9);
}

.orange {
    background: hsla(45, 100%, 50%, 0.9);
}

.yellow {
    background: hsla(72, 100%, 53%, 0.9);
}

.white {
    background: hsla(60, 11%, 98%, 0.9);
}

</style>