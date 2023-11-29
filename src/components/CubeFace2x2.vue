<template>
    <div style="display: flex;">
        <div>
            <div 
            ref="el"
            @mousedown="$emit('start-swipe', 0)" 
            @mouseup="$emit('end-swipe', 0)"
            @touchstart="start = 0"
            :class="['square', face[0]]"
            />
            <div
            ref="el3"
            @mousedown="$emit('start-swipe', 3)"
            @mouseup="$emit('end-swipe', 3)"
            @touchstart="start = 3"
            :class="['square', face[3]]"
            />
        </div>
        <div>
            <div 
            @mousedown="$emit('start-swipe', 1)"
            @mouseup="$emit('end-swipe', 1)" 
            @touchstart="start = 1"
            :class="['square', face[1]]"
            />
            <div 
            @mousedown="$emit('start-swipe', 2)"
            @mouseup="$emit('end-swipe', 2)"
            @touchstart="start = 2"
            :class="['square', face[2]]"
            />
        </div>
    </div>
</template>

<script>

import { useSwipe } from '@vueuse/core';
import { ref } from 'vue';

export default {
    name: 'CubeFace2x2',
    props: {
        face: Array
    },
    data() {
        return {
            start: null
        }
    },
    setup(props, context) {
    const el = ref(null)
    const { isSwiping, direction } = useSwipe(el, {
        onSwipeEnd(e, direction) {
            context.emit('start-swipe', 0);
            if (direction === 'right') {
                context.emit('end-swipe', 1);
            } else if (direction === 'down') {
                context.emit('end-swipe', 3);
            }
        }
    })

    const el3 = ref(null)
    const { isSwiping3, direction3 } = useSwipe(el3, {
        onSwipeEnd(e, direction) {
            context.emit('start-swipe', 3);
            if (direction === 'right') {
                context.emit('end-swipe', 2);
            } else if (direction === 'up') {
                context.emit('end-swipe', 0);
            }
        }
    })

    return { el, isSwiping, direction, el3, isSwiping3, direction3 }
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