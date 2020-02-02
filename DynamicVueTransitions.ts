// Use like so: 
const routeTransitions = {
  '/': class extends TransitionHandler {
    static async enter(el, done) {
      // Use an animation library to do some wild stuff
      await wildStuff();
      done();
    }
  }
}

const vueTemplate = `
  <dynamic-transition 
    :transition-handler="routeTransitions[$route.path]"
   >
   </dynamic-transition>
 `

// base transition handler 
class TransitionHandler {
  static duration: 1000;
  static async beforeEnter() {
    console.log('beforeEnter', arguments);
  }
  static async enter(el, done) {
    // if `done` arg isn't accessed, vue will run synchronously
    done();
    console.log('enter', arguments);
  }
  static async afterEnter() {
    console.log('afterenter', arguments);
  }
  static async enterCancelled() {
    console.log('after cancel', arguments);
  }
  static async beforeLeave() {
    console.log('before leave', arguments);
  }
  static async leave(el, done) {
    // if `done` arg isn't accessed, vue will run synchronously
    done();
    console.log('leave', arguments);
  }
  static async afterLeave() {
    console.log('after leave', arguments);
  }
  static async leaveCancelled() {
    console.log('leave cancelled', arguments);
  }
}
// transition component
Vue.component('dynamic-transition', {
  template: `
    <transition
      appear
      name="dynamic"
      mode="out-in"
      :duration="{ enter: transitionHandler.duration, leave: transitionHandler.duration }"
      v-bind:css="true"
      v-on:before-enter="transitionHandler.beforeEnter"
      v-on:enter="transitionHandler.enter"
      v-on:after-enter="transitionHandler.afterEnter"
      v-on:enter-cancelled="transitionHandler.enterCancelled"
      v-on:before-leave="transitionHandler.beforeLeave"
      v-on:leave="transitionHandler.leave"
      v-on:after-leave="transitionHandler.afterLeave"
      v-on:leave-cancelled="transitionHandler.leaveCancelled"
    >
      <slot></slot>
    </transition>
  `,
  props: ['transition-handler']
});
