import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { Subscription, catchError, finalize } from "rxjs";
import { MessageService } from "../user_service/message.service";

@Component({
  selector: "file-upload",
  templateUrl: "imageUpload.component.html",
  styleUrls: ["imageUpload.component.css"],
})
export class FileUploadComponent implements OnDestroy {
  @Input()
  productId?: string;

  @Input()
  productType?: string;

  @Input()
  requiredFileType?: string;
  @Output() public onUploadFinished = new EventEmitter();

  fileName = "";
  uploadProgress?: number;
  uploadSub!: Subscription;

  progress = 0;
  total = 100;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append("file" + index, file, file.name);
    });

    formData.append("productId", this.productId ?? "");
    formData.append("productType", this.productType ?? "");

    this.http
      .post("/api/FileUpload", formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(finalize(() => this.reset()))
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(
              (100 * event.loaded) / (event.total ?? 100)
            );
          else if (event.type === HttpEventType.Response) {
            this.messageService.openNotifyDialog("Upload thành công");
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }

  ngOnDestroy(): void {
    this.reset();
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub.unsubscribe();
  }
}
