import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../../Schema/product.schema';
import { Model } from 'mongoose';
import { ProductDto } from '../../dto/product.dto';
import { FilterProductDto } from '../../dto/filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  //get all products
  async products(): Promise<Product[]> {
    const product = await this.productModel.find().exec();
    return product;
  }

  //get product by id
  async product(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  //create product
  async create(product: ProductDto): Promise<Product> {
    const createProduct = await this.productModel.create(product);
    return createProduct.save();
  }

  //update product
  async update(id: string, product: ProductDto): Promise<Product> {
    const updateProduct = await this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
    return updateProduct;
  }

  //delete product
  async delete(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id);
    return product;
  }
}
