<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

function navigate(target) {
  switch (target) {
    case 'home':
      router.push('/');
      break;
    // case 'influencers':
    //   router.push('/influencers');
    //   break;
    // case 'campaign':
    //   router.push('/campaign');
    //   break;
    // case 'sales':
    //   router.push('/sales');
    //   break;
    // case 'contract':
    //   router.push('/contract');
    //   break;
    // case 'management':
    //   router.push('/management');
    //   break;
  }
}
</script>

<template>
  <header class="header">
    <div class="header-bottom">
      <button class="logo-button" @click="navigate('home')">
        <img src="@/assets/icons/logo.png" alt="logo" />
      </button>
      <nav class="nav-menu">
        <button>인플루언서</button>
        <button>캠페인</button>
        <button>영업관리</button>
        <button>전자계약</button>
        <button>관리</button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  position: relative;
  height: 90px;
  border-bottom: 1px var(--tmt-color-gray-medium) solid;
  background-color: white;
}

.header-bottom {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}

.logo-button {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 80px;
}

.logo-button img {
  height: 220px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

.nav-menu {
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
}

.nav-menu button {
  all: unset;
  display: inline-block;
  font-size: var(--tmt-font-size-lg);
  font-weight: var(--tmt-font-weight-semibold);
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  text-align: center;
  background-color: black;
  padding: 8px 0;
  border-radius: 4px;
  width: 100px;
  min-width: 120px;
  z-index: 20;
}
.dropdown-menu button {
  all: unset;
  display: block;
  width: 100%;
  padding: 12px 0;
  font-size: 1rem;
  text-align: center;
  color: #d4c56f;
  cursor: pointer;
}
.dropdown-menu button:hover {
  background-color: #333;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>

