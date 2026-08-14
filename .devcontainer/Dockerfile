FROM node:20-bookworm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    python3 \
    python3-pip \
    && pip3 install --no-cache-dir --break-system-packages pre-commit \
    && rm -rf /var/lib/apt/lists/*

RUN useradd --create-home --shell /bin/bash vscode \
    && mkdir -p /workspaces/peptide-site \
    && chown -R vscode:vscode /workspaces/peptide-site

USER vscode
WORKDIR /workspaces/peptide-site

CMD ["/bin/bash"]
