import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ArcaneForm from "../components/ArcaneForm";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl w-full space-y-4 px-6 mx-auto">
      <div className="mt-10 grid grid-cols-7 w-full ">
        <span className="flex items-center justify-center text-sm ">
          Symbol
        </span>
        <span className="flex items-center justify-center text-sm ">Level</span>
        <span className="flex items-center justify-center text-sm  ">
          Progress
        </span>
        <span className="flex items-center justify-center text-sm  ">
          Hunting
        </span>
        <span className="flex items-center justify-center text-sm  ">
          Conetent
        </span>

        <span className="flex items-center justify-center text-sm  ">
          Caculate
        </span>
        <span className="flex items-center justify-center text-sm  ">Days</span>
      </div>
      <ArcaneForm
        imgurl="https://w.namu.la/s/fd79a7424333692c3eb8b303c96e0f57f7be83af7bd45733120a0b3bb6f9d79f1c7bce437dfca715a2536382f0b2e8b1a6c5af61f7efeea0a6ce0801e48851f22f5721d6ff49be516bdc455697d47819a151fb6791609a817d51bd2095e5f216"
        huntFactor={16}
        contentFactor={6}
      />
      <ArcaneForm
        imgurl="https://w.namu.la/s/21d90c713be1958d3eb81769ec269f88f9b5ab7d43e6d2341eca5f36f2d1364154593981a3ee470bf6f98e26fdc438ed04d2190b83fceb6902b26e23823dc24f2693405ffc54379c878a19a8d0eb853ad114892c2a446d6ff59d76c016a89e96"
        huntFactor={8}
        contentFactor={15}
      />
      <ArcaneForm
        imgurl="https://w.namu.la/s/9864b0f307766f0c12cffd82e9483b251977f8153e7a1e9593c24ecd00878e28c22b816ce0529d84a41fd40eee9063d70ed25c50dd7c7d430aa070954bba1715a2f586766a97f22322b3ea15e4787f09a6c1d5409e497337d5bb67e1da4ef36f"
        huntFactor={8}
        contentFactor={7}
      />
      <ArcaneForm
        imgurl="https://w.namu.la/s/84392c01e2be693b0eb97b9a4045e69e9a739b2c724063eb7b4802ded88ace65937b867f8b4618bd766af78d3c19710efcb2f49df5561ea3f69e4bdd3c370ef4ef74ee5d041ac6f75d41fe28f3b3bcb86249d979fcd21bf42d0f47bfcc130000"
        huntFactor={8}
        contentFactor={10}
      />
      <ArcaneForm
        imgurl="https://w.namu.la/s/b0c8fa0e2bbe2e9ae3117e3ce775ede08e33a9385f5d375b6dcd80b2d523dbdb7e03e5650b123eb0acd8af825822d2d4c2b6eb242c8e36e8fdd719a9294dbb7e7143962cc087d3a8a7e7342f8b94eaf8917155be6ceb011bca3ec007d2b63a9e"
        huntFactor={8}
        contentFactor={6}
      />
      <ArcaneForm
        imgurl="https://w.namu.la/s/33a8b40f6f85b5f33ea1bab8de8b31b2799d2a274d69876b2e8429c1ce12c217ab5c733a67092715bee9592da931345ce85e8866e131b2e8bc7ee6720b3b1edf28e720262dab3b84f1353495ab327e0b95997a8e15b86e2ddd4b82881438ceda"
        huntFactor={8}
        contentFactor={6}
      />
    </div>
  );
};

export default Home;
