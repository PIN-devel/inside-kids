<template>
  <div class="row my-5 mx-5">
    <div class="col-12 text-center my-auto">
      <v-avatar v-if="imageLoaded" size="120px">
        <img v-if="!existImage" src="../../assets/default_kid.png" alt="kids-profile" />
        <img v-if="existImage" :src="imagePath" alt="kids-profile" />
      </v-avatar>
    </div>

    <div class="col-12 text-center my-auto">
      <div class="text-center justify-center">
        <h1 class="font-weight-bold mb-5">
          <i class="fas fa-house-user"></i>
          {{ kid.name }}
        </h1>
      </div>
    </div>
    <div class="col-12 text-center my-auto">
      <v-btn @click="moveToChildPage" color="deep-orange lighten-3" class="py-6">
        <v-avatar width="35" min-width="35" height="35" class="mr-3">
          <img src="../../assets/sisongHead.png" alt="kids-profile" />
        </v-avatar>
        <h3 style="color:white">{{ kid.name }} 페이지로 이동</h3>
        <i class="far fa-hand-pointer fa-lg ml-2" style="color:white"></i>
      </v-btn>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";
import SERVER from "@/api/drf";

// import axios from 'axios'
export default {
  name: "KidProfile",
  data: function () {
    return {
      imageLoaded: false,
      existImage: false,
    };
  },
  computed: {
    ...mapState(["kid"]),
    imagePath() {
      return SERVER.URL + this.kid.image;
    },
  },

  methods: {
    moveToChildPage() {
      router.push({ name: "KidsMainView", params: { kidId: this.kid.id } });
    },
  },
  watch: {
    kid: function () {
      this.imageLoaded = true;
      if (this.kid.image != "/media/default_image.jpg") {
        this.existImage = true;
      }
    },
  },
};
</script>

<style>
.box {
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
}
</style>
