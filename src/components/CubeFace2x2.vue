<template>
    <div style="display: flex; user-select: none;">
        <div style='user-select: none;'>
            <div 
            @mousedown="$emit('start-swipe', 0)" 
            @mouseup="$emit('end-swipe', 0)"
            @touchstart="$emit('start-swipe', 0)"
            @touchcancel="$emit('end-swipe', 0)"
            @touchend="$emit('end-swipe', 0)" 
            :class="['square', face[0]]"
            />
            <div
            @mousedown="$emit('start-swipe', 3)"
            @mouseup="$emit('end-swipe', 3)"
            @touchstart="$emit('start-swipe', 3)"
            @touchcancel="$emit('end-swipe', 0)"
            @touchend="$emit('end-swipe', 3)"  
            :class="['square', face[3]]"
            />
        </div>
        <div>
            <div 
            @mousedown="$emit('start-swipe', 1)"
            @mouseup="$emit('end-swipe', 1)"
            @touchstart="$emit('start-swipe', 1)"
            @touchcancel="$emit('end-swipe', 0)"
            @touchend="$emit('end-swipe', 1)"  
            :class="['square', face[1]]"
            />
            <div 
            @mousedown="$emit('start-swipe', 2)"
            @mouseup="$emit('end-swipe', 2)"
            @touchstart="$emit('start-swipe', 2)"
            @touchcancel="$emit('end-swipe', 0)"
            @touchend="$emit('end-swipe', 2)" 
            :class="['square', face[2]]"
            />
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