<template>
    <div style="display: flex;">
        <div>
            <div 
            ref="c0"
            data-corner="0"
            @mousedown="$emit('start-swipe', 0)" 
            @mouseup="$emit('end-swipe', 0)"
            @touchmove="touchMove($event)"
            :class="['square', face[0]]"
            />
            <div
            ref="c3"
            data-corner="3"
            @mousedown="$emit('start-swipe', 3)"
            @mouseup="$emit('end-swipe', 3)"
            @touchmove="touchMove($event)"
            :class="['square', face[3]]"
            />
        </div>
        <div>
            <div 
            ref="c1"
            data-corner="1"
            @mousedown="$emit('start-swipe', 1)"
            @mouseup="$emit('end-swipe', 1)" 
            @touchmove="touchMove($event)"
            :class="['square', face[1]]"
            />
            <div 
            ref="c2"
            data-corner="2"
            @mousedown="$emit('start-swipe', 2)"
            @mouseup="$emit('end-swipe', 2)"
            @touchmove="touchMove($event)"
            :class="['square', face[2]]"
            />
        </div>
    </div>
</template>

<script>

import { useSwipe } from '@vueuse/core';
import { ref, toRaw } from 'vue';

export default {
    name: 'CubeFace2x2',
    props: {
        face: Array
    },
    methods: {
        touchMove(event) {
            let pageX = event.touches[0].pageX;
            let pageY = event.touches[0].pageY;
            if (window.document.elementFromPoint(pageX, pageY).dataset && window.document.elementFromPoint(pageX, pageY).dataset.corner) {
                this.end = window.document.elementFromPoint(pageX, pageY).dataset.corner;
            }
        }
    },
    setup(props, context) {

    const end = ref(-1);
        
    const c0 = ref(null)
    const { isSwiping, direction } = useSwipe(c0, {
        onSwipeEnd(e, direction) {
            console.log("Swipe ending on: " + end.value);
            context.emit('start-swipe', 0);
            context.emit('end-swipe', Number(end.value));
        }
    })

    const c1 = ref(null)
    const { isSwiping1, direction1 } = useSwipe(c1, {
        onSwipeEnd(e, direction) {
            console.log("Swipe ending on: " + end.value);
            context.emit('start-swipe', 1);
            context.emit('end-swipe', Number(end.value));
        }
    })

    const c2 = ref(null)
    const { isSwiping2, direction2 } = useSwipe(c2, {
        onSwipeEnd(e, direction) {
            console.log("Swipe ending on: " + end.value);
            context.emit('start-swipe', 2);
            context.emit('end-swipe', Number(end.value));
        }
    })

    const c3 = ref(null)
    const { isSwiping3, direction3 } = useSwipe(c3, {
        onSwipeEnd(e, direction) {
            console.log("Swipe ending on: " + end.value);
            context.emit('start-swipe', 3);
            context.emit('end-swipe', Number(end.value));
        }
    })

    return { c0, isSwiping, direction, c1, isSwiping1, direction1, c2, isSwiping2, direction2, c3, isSwiping3, direction3, end }
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