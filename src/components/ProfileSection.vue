<script setup>
import { ref } from 'vue'
import SkillTag from './SkillTag.vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

// アニメーション用
const { isVisible, target } = useIntersectionObserver({ once: true })

// プロフィールデータ
const profile = ref({
  name: '山田 太郎',
  title: 'フロントエンドエンジニア',
  bio: `Web開発に情熱を注ぐフロントエンドエンジニアです。
        ユーザー体験を第一に考え、美しく使いやすいインターフェースの実装を得意としています。
        最新の技術トレンドをキャッチアップしながら、実用的なソリューションの提供を心がけています。`,
  location: '東京, 日本',
  email: 'contact@example.com'
})

// スキルデータ
const skills = ref([
  // Frontend
  { name: 'Vue.js', level: 5, category: 'frontend' },
  { name: 'React', level: 4, category: 'frontend' },
  { name: 'TypeScript', level: 4, category: 'frontend' },
  { name: 'JavaScript', level: 5, category: 'frontend' },
  { name: 'HTML/CSS', level: 5, category: 'frontend' },
  { name: 'Tailwind CSS', level: 4, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 3, category: 'backend' },
  { name: 'Express', level: 3, category: 'backend' },
  { name: 'Python', level: 2, category: 'backend' },
  
  // Tools
  { name: 'Git', level: 4, category: 'tools' },
  { name: 'Docker', level: 3, category: 'tools' },
  { name: 'Vite', level: 4, category: 'tools' },
  { name: 'Webpack', level: 3, category: 'tools' },
  
  // Database
  { name: 'MongoDB', level: 3, category: 'database' },
  { name: 'PostgreSQL', level: 2, category: 'database' }
])

// SNSリンク
const socialLinks = ref([
  { 
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  },
  {
    name: 'Qiita',
    url: 'https://qiita.com',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-2h2v2h-2z'
  }
])

// スキルをカテゴリーごとにグループ化
const groupedSkills = ref({
  frontend: skills.value.filter(s => s.category === 'frontend'),
  backend: skills.value.filter(s => s.category === 'backend'),
  tools: skills.value.filter(s => s.category === 'tools'),
  database: skills.value.filter(s => s.category === 'database')
})
</script>

<template>
  <section 
    ref="target"
    class="py-16 md:py-24"
    :class="{ 'animate-fade-up': isVisible }"
  >
    <div class="max-w-6xl mx-auto">
      <!-- セクションタイトル -->
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
        Profile
      </h2>
      
      <!-- プロフィールコンテンツ -->
      <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- 左側：画像とSNS -->
        <div class="lg:col-span-1">
          <div class="text-center lg:text-left">
            <!-- プロフィール画像 -->
            <div class="inline-block mb-6">
              <div class="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-lg">
                <span class="text-4xl text-primary-600">👤</span>
              </div>
            </div>
            
            <!-- 名前と職種 -->
            <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ profile.name }}</h3>
            <p class="text-primary-600 font-medium mb-2">{{ profile.title }}</p>
            <p class="text-gray-500 text-sm mb-6">📍 {{ profile.location }}</p>
            
            <!-- SNSリンク -->
            <div class="flex justify-center lg:justify-start gap-3">
              <a 
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center transition-colors group"
                :aria-label="social.name"
              >
                <svg class="w-5 h-5 text-gray-600 group-hover:text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path :d="social.icon" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- 右側：自己紹介とスキル -->
        <div class="lg:col-span-2 space-y-8">
          <!-- 自己紹介 -->
          <div>
            <h4 class="text-xl font-semibold text-gray-900 mb-4">About Me</h4>
            <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ profile.bio }}</p>
          </div>
          
          <!-- スキルセット -->
          <div>
            <h4 class="text-xl font-semibold text-gray-900 mb-4">Skills</h4>
            
            <!-- Frontend Skills -->
            <div class="mb-6">
              <h5 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Frontend</h5>
              <div class="flex flex-wrap gap-2">
                <SkillTag 
                  v-for="skill in groupedSkills.frontend"
                  :key="skill.name"
                  :name="skill.name"
                  :level="skill.level"
                  :category="skill.category"
                />
              </div>
            </div>
            
            <!-- Backend Skills -->
            <div class="mb-6">
              <h5 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Backend</h5>
              <div class="flex flex-wrap gap-2">
                <SkillTag 
                  v-for="skill in groupedSkills.backend"
                  :key="skill.name"
                  :name="skill.name"
                  :level="skill.level"
                  :category="skill.category"
                />
              </div>
            </div>
            
            <!-- Tools -->
            <div class="mb-6">
              <h5 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Tools & Technologies</h5>
              <div class="flex flex-wrap gap-2">
                <SkillTag 
                  v-for="skill in groupedSkills.tools"
                  :key="skill.name"
                  :name="skill.name"
                  :level="skill.level"
                  :category="skill.category"
                />
              </div>
            </div>
            
            <!-- Database -->
            <div>
              <h5 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Database</h5>
              <div class="flex flex-wrap gap-2">
                <SkillTag 
                  v-for="skill in groupedSkills.database"
                  :key="skill.name"
                  :name="skill.name"
                  :level="skill.level"
                  :category="skill.category"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>