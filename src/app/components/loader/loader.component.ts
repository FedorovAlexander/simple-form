import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoaderSize } from './loader-size.enum';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() size!: LoaderSize;
}
