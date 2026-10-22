export const domains = [
  { id: "data", title: "Data & preprocessing", detail: "Paired RGB images and class-index masks are checked for missing pairs. Images are resized with bilinear interpolation, padded to preserve aspect ratio, converted to tensors, and normalized. Masks use nearest-neighbor resizing to preserve discrete class IDs.", tradeoff: "Image geometry and label identity need different interpolation rules. Ground-truth masks support learning and evaluation; they are not inference inputs.", source: "dataset.py · transforms.py" },
  { id: "backbone", title: "ResNet-50 features", detail: "The model factory constructs Torchvision’s standard DeepLabV3 with a ResNet-50 backbone. Residual stages extract spatial features; the standard segmentation backbone uses dilation in later stages to retain spatial detail.", tradeoff: "A pretrained backbone provides visual representations. Creating the model does not establish that segmentation weights have been trained or deployed.", source: "model.py / create_model · Torchvision DeepLabV3" },
  { id: "aspp", title: "Multi-scale context / ASPP", detail: "One spatial feature map feeds five parallel branches: a 1 × 1 convolution, three 3 × 3 atrous convolutions with different dilation rates, and an image-pooling branch resized to the feature grid. Outputs are concatenated and projected with a 1 × 1 convolution.", tradeoff: "Parallel receptive fields combine local evidence and broader context. The schematic uses symbolic rates r₁ < r₂ < r₃ rather than claiming a pinned project configuration.", source: "Torchvision / DeepLabHead · ASPP" },
  { id: "classifier", title: "Pixel classification & resizing", detail: "The standard DeepLabV3 head applies a 3 × 3 convolutional block and a 1 × 1 class-score projection. Torchvision resizes logits to the model-input resolution with bilinear interpolation. The project’s predict_classes helper uses argmax over classes.", tradeoff: "Resizing restores the tensor’s spatial dimensions, not detail lost during feature extraction. This is DeepLabV3, without a DeepLabV3+ low-level decoder path.", source: "model.py / predict_classes · Torchvision forward path" },
  { id: "outputs", title: "Semantic output", detail: "Class scores resolve to one semantic class index per pixel. This is semantic segmentation of part categories, rather than separate object-instance masks. The illustrated vehicle and mask are authored examples, not predictions from a trained model.", tradeoff: "A class-index map is the model-level output. File-based inference and output packaging still need an implemented entry point.", source: "model.py / predict_classes · inference.py scaffold" },
  { id: "evaluation", title: "Offline evaluation", detail: "Predicted class maps and held-out masks populate a confusion matrix. The implemented metrics utility computes per-class IoU, mean IoU, and foreground mean IoU from pixel intersections and unions.", tradeoff: "Foreground metrics help expose background dominance. Metric utilities are implemented, but the validation-analysis runner is still a scaffold; no benchmark values are asserted here.", source: "metrics.py · analyze_validation.py scaffold" },
] as const;

export type DomainId = typeof domains[number]["id"];

export const branches = [
  { name: "Pointwise", operation: "1 × 1 conv", context: "Local projection", sampling: 0 },
  { name: "Atrous / r₁", operation: "3 × 3 conv", context: "Smaller context", sampling: 1 },
  { name: "Atrous / r₂", operation: "3 × 3 conv", context: "Wider context", sampling: 2 },
  { name: "Atrous / r₃", operation: "3 × 3 conv", context: "Widest context", sampling: 3 },
  { name: "Image pooling", operation: "Pool + 1 × 1", context: "Resize to feature grid", sampling: 4 },
] as const;

export const roadmap = [
  { capability: "Paired data & preprocessing", purpose: "Validate image–mask pairs; preserve geometry and class IDs.", status: "Implemented", evidence: "dataset.py · transforms.py" },
  { capability: "DeepLabV3 forward path", purpose: "Construct the model and select a class per pixel.", status: "Implemented", evidence: "model.py · model tests" },
  { capability: "Segmentation metric utilities", purpose: "Accumulate confusion; compute per-class, mean and foreground IoU.", status: "Implemented", evidence: "metrics.py · metric tests" },
  { capability: "Training & evaluation runners", purpose: "Connect configured training, error review and model selection.", status: "Scaffold", evidence: "train.py · analysis scripts are empty" },
  { capability: "Image-to-mask inference CLI", purpose: "Package image validation, preprocessing and prediction output.", status: "Scaffold", evidence: "inference.py is empty" },
  { capability: "FastAPI serving", purpose: "Expose a prediction interface.", status: "Planned", evidence: "Portfolio integration target" },
  { capability: "Docker & ONNX", purpose: "Package a runtime and investigate model export.", status: "Planned", evidence: "Portfolio integration targets" },
  { capability: "CI/CD automation", purpose: "Automate engineering checks with GitHub Actions.", status: "Planned", evidence: "Portfolio integration target" },
] as const;
