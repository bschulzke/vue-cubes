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
    border-radius: 10px;
}

.red {
    background: hsla(0, 100%, 50%, 1);
}

.blue {
    background: hsla(230, 100%, 50%, 1);
}

.green {
    background: hsla(118, 100%, 50%, 1);
}

.orange {
    background: rgba(255, 165, 0, 1);
}

.yellow {
    background: rgb(240, 252, 0);
}

.white {
    background: hsla(60, 11%, 98%, 1);
}

</style>