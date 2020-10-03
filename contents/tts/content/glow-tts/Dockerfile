FROM pytorch/pytorch:1.5.1-cuda10.1-cudnn7-devel
ENV NVIDIA_VISIBLE_DEVICES all

ENV PATH /usr/local/nvidia/bin:/usr/local/cuda/bin:${PATH}

RUN apt-get update && apt-get install -y \
    build-essential \
    tmux \
    curl \
    unzip \
    git \
 && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/NVIDIA/apex /apex
WORKDIR /apex/
RUN git checkout 37cdaf4
RUN pip install -v --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" .

RUN pip install --no-cache-dir \
    "cython==0.29.12" \ 
    "librosa==0.6.0" \ 
    "numpy==1.16.4" \ 
    "scipy==1.3.0" \ 
    "numba==0.48" \
    "Unidecode==1.0.22" \
    "tensorflow==2.3.0" \ 
    "inflect==4.1.0" \
    "matplotlib==3.3.0"

RUN mkdir -p /content/glow-tts

WORKDIR /content/glow-tts

CMD ["/content/glow-tts/train_ddi.sh", "configs/base.json", "/content/data/generated/glow-tts"]
