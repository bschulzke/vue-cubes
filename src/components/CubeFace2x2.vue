<template>
    <div style="display: flex;">
        <div>
            <div 
            ref="c0"
            @mousedown="$emit('start-swipe', 0)" 
            @mouseup="$emit('end-swipe', 0)"
            @touchstart="start = 0"
            :class="['square', face[0]]"
            />
            <div
            ref="c3"
            @mousedown="$emit('start-swipe', 3)"
            @mouseup="$emit('end-swipe', 3)"
            @touchstart="start = 3"
            :class="['square', face[3]]"
            />
        </div>
        <div>
            <div 
            ref="c1"
            @mousedown="$emit('start-swipe', 1)"
            @mouseup="$emit('end-swipe', 1)" 
            @touchstart="start = 1"
            :class="['square', face[1]]"
            />
            <div 
            ref="c2"
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
    const c0 = ref(null)
    const { isSwiping, direction } = useSwipe(c0, {
        onSwipeEnd(e, direction) {
            context.emit('start-swipe', 0);
            if (direction === 'right') {
                context.emit('end-swipe', 1);
            } else if (direction === 'down') {
                context.emit('end-swipe', 3);
            }
        }
    })

    const c1 = ref(null)
    const { isSwiping1, direction1 } = useSwipe(c1, {
        onSwipeEnd(e, direction) {
            context.emit('start-swipe', 1);
            if (direction === 'left') {
                context.emit('end-swipe', 0);
            } else if (direction === 'down') {
                context.emit('end-swipe', 2);
            }
        }
    })

    const c2 = ref(null)
    const { isSwiping2, direction2 } = useSwipe(c2, {
        onSwipeEnd(e, direction) {
            context.emit('start-swipe', 2);
            if (direction === 'left') {
                context.emit('end-swipe', 3);
            } else if (direction === 'up') {
                context.emit('end-swipe', 1);
            }
        }
    })

    const c3 = ref(null)
    const { isSwiping3, direction3 } = useSwipe(c3, {
        onSwipeEnd(e, direction) {
            context.emit('start-swipe', 3);
            if (direction === 'right') {
                context.emit('end-swipe', 2);
            } else if (direction === 'up') {
                context.emit('end-swipe', 0);
            }
        }
    })

    return { c0, isSwiping, direction, c1, isSwiping1, direction1, c2, isSwiping2, direction2, c3, isSwiping3, direction3 }
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